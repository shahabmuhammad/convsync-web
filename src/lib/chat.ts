// Endpoint of the chat proxy (chat-proxy/). Baked in at build time; the
// Langflow API key lives only in the proxy, never in the browser bundle.
const CHAT_ENDPOINT = process.env.NEXT_PUBLIC_CHAT_ENDPOINT ?? "";

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

export async function sendChatMessage(message: string, sessionId: string): Promise<string> {
  if (!CHAT_ENDPOINT) {
    throw new Error("Chat is not configured yet. Set NEXT_PUBLIC_CHAT_ENDPOINT.");
  }

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
