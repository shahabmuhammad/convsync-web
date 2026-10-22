// Two ways to reach the agent:
//
// 1. Proxy (recommended): NEXT_PUBLIC_CHAT_ENDPOINT points at chat-proxy/, which
//    holds the Langflow API key server-side.
// 2. Direct (testing only): NEXT_PUBLIC_LANGFLOW_API_KEY is set and the browser
//    calls Langflow itself. The key is then baked into the public JS bundle, so
//    rotate it after testing.
const CHAT_ENDPOINT = process.env.NEXT_PUBLIC_CHAT_ENDPOINT ?? "";
const LANGFLOW_HOST = process.env.NEXT_PUBLIC_LANGFLOW_HOST ?? "https://staging.metamod.ai";
const LANGFLOW_FLOW_ID =
  process.env.NEXT_PUBLIC_LANGFLOW_FLOW_ID ?? "8d7bf3a3-dfa3-45dc-9b44-ac15b92cbb28";
const LANGFLOW_API_KEY = process.env.NEXT_PUBLIC_LANGFLOW_API_KEY ?? "";

const SESSION_KEY = "convsync-chat-session";

export function getSessionId(): string {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

type LangflowResponse = {
  outputs?: { outputs?: { results?: { message?: { text?: string } } }[] }[];
  detail?: string;
};

async function sendViaProxy(message: string, sessionId: string): Promise<string> {
  const res = await fetch(CHAT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, sessionId }),
  });

  const data = (await res.json().catch(() => ({}))) as { text?: string; error?: string };
  if (!res.ok || !data.text) {
    throw new Error(data.error ?? "Something went wrong. Please try again.");
  }
  return data.text;
}

async function sendDirect(message: string, sessionId: string): Promise<string> {
  const res = await fetch(`${LANGFLOW_HOST}/api/v1/run/${LANGFLOW_FLOW_ID}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": LANGFLOW_API_KEY },
    body: JSON.stringify({
      input_type: "chat",
      output_type: "chat",
      input_value: message,
      session_id: sessionId,
    }),
  });

  const data = (await res.json().catch(() => ({}))) as LangflowResponse;
  const text = data.outputs?.[0]?.outputs?.[0]?.results?.message?.text;
  if (!res.ok || !text) {
    throw new Error("The agent is unavailable right now. Please try again.");
  }
  return text;
}

export async function sendChatMessage(message: string, sessionId: string): Promise<string> {
  if (CHAT_ENDPOINT) return sendViaProxy(message, sessionId);
  if (LANGFLOW_API_KEY) return sendDirect(message, sessionId);
  throw new Error("Chat is not configured yet.");
}
