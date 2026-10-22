/**
 * Convsync chat proxy.
 *
 * The static site (GitHub Pages) cannot hold secrets, so the browser talks to
 * this Worker instead of Langflow. The Worker adds the API key server-side,
 * only accepts requests from ALLOWED_ORIGINS, rate-limits by IP, and returns
 * just the reply text — never the raw Langflow payload.
 */

interface Env {
  LANGFLOW_API_KEY: string;
  LANGFLOW_HOST: string;
  LANGFLOW_FLOW_ID: string;
  ALLOWED_ORIGINS: string;
  RATE_LIMITER?: { limit(opts: { key: string }): Promise<{ success: boolean }> };
}

const MAX_MESSAGE_LENGTH = 2000;
const SESSION_ID = /^[a-zA-Z0-9-]{8,64}$/;

function corsHeaders(origin: string): HeadersInit {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(body: unknown, status: number, origin: string): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") ?? "";
    const allowed = env.ALLOWED_ORIGINS.split(",").map((o) => o.trim());

    if (!allowed.includes(origin)) {
      return new Response("Forbidden", { status: 403 });
    }
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (request.method !== "POST" || new URL(request.url).pathname !== "/chat") {
      return json({ error: "Not found" }, 404, origin);
    }

    if (env.RATE_LIMITER) {
      const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
      const { success } = await env.RATE_LIMITER.limit({ key: ip });
      if (!success) {
        return json({ error: "Too many messages. Please wait a minute." }, 429, origin);
      }
    }

    let message: unknown;
    let sessionId: unknown;
    try {
      ({ message, sessionId } = (await request.json()) as Record<string, unknown>);
    } catch {
      return json({ error: "Invalid JSON" }, 400, origin);
    }

    if (typeof message !== "string" || !message.trim()) {
      return json({ error: "Message is required" }, 400, origin);
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return json({ error: "Message is too long" }, 413, origin);
    }
    if (typeof sessionId !== "string" || !SESSION_ID.test(sessionId)) {
      return json({ error: "Invalid session" }, 400, origin);
    }

    const upstream = await fetch(
      `${env.LANGFLOW_HOST}/api/v1/run/${env.LANGFLOW_FLOW_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.LANGFLOW_API_KEY,
        },
        body: JSON.stringify({
          input_type: "chat",
          output_type: "chat",
          input_value: message.trim(),
          session_id: sessionId,
        }),
      },
    );

    if (!upstream.ok) {
      console.error("Langflow error", upstream.status, await upstream.text());
      return json({ error: "The agent is unavailable right now." }, 502, origin);
    }

    const data = (await upstream.json()) as {
      outputs?: { outputs?: { results?: { message?: { text?: string } } }[] }[];
    };
    const text = data.outputs?.[0]?.outputs?.[0]?.results?.message?.text;

    if (!text) {
      return json({ error: "The agent returned an empty reply." }, 502, origin);
    }
    return json({ text, sessionId }, 200, origin);
  },
};
