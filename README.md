# Convsync website

Next.js 16 (static export) + Tailwind v4 + shadcn/ui. Fonts: Fraunces (headings),
Instrument Sans (body), JetBrains Mono (code).

## How the hero chat is wired (and why)

```
Browser (GitHub Pages) ──POST /chat──▶ chat-proxy (Cloudflare Worker) ──x-api-key──▶ Langflow
```

GitHub Pages only serves static files, so anything in the site — including
`NEXT_PUBLIC_*` env vars and the `<langflow-chat api_key="...">` embed — is
readable by every visitor. The Langflow API key therefore lives **only** in the
Worker as an encrypted secret. The Worker also:

- accepts requests only from `ALLOWED_ORIGINS` (CORS + server-side check),
- rate-limits to 20 messages/minute per IP,
- caps messages at 2,000 chars and validates the session id,
- returns only `{ text }`, never the raw Langflow payload.

## Local development

```bash
# 1. proxy (key is read from chat-proxy/.dev.vars, which is git-ignored)
cd chat-proxy && npm install && npm run dev      # http://localhost:8787

# 2. site (reads NEXT_PUBLIC_CHAT_ENDPOINT from .env.local)
npm install && npm run dev                        # http://localhost:3000
```

## Deploy

### 1. Chat proxy → Cloudflare Workers (free tier)

```bash
cd chat-proxy
npx wrangler login
npx wrangler secret put LANGFLOW_API_KEY          # paste the key when prompted
```

Set `ALLOWED_ORIGINS` in `chat-proxy/wrangler.toml` to your Pages origin, e.g.
`https://<user>.github.io` (origin only — no repo path, no trailing slash), then:

```bash
npx wrangler deploy                               # prints https://convsync-chat-proxy.<you>.workers.dev
```

### 2. Site → GitHub Pages

1. Push this folder to a GitHub repo (branch `main`).
2. **Settings → Pages → Source:** GitHub Actions.
3. **Settings → Secrets and variables → Actions → Variables:** add
   `CHAT_ENDPOINT` = `https://convsync-chat-proxy.<you>.workers.dev/chat`.
4. Push — `.github/workflows/deploy.yml` builds `out/` and publishes it. The
   base path (`/<repo>`) is set automatically.
