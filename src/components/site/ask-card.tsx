"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { Activity, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getSessionId, sendChatMessage } from "@/lib/chat";
import { cn } from "@/lib/utils";

type Message = { role: "agent" | "user"; text: string; error?: boolean };

const suggestions = [
  "Invoice exceptions",
  "Connect ServiceNow to SAP",
  "Modernize a legacy app",
];

const greeting: Message = {
  role: "agent",
  text: "Hi. What workflow is costing your team the most time right now?",
};

export function AskCard() {
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [value, setValue] = useState("");
  const [pending, setPending] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);
  const started = messages.length > 1;

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  async function send(text: string) {
    const message = text.trim();
    if (!message || pending) return;

    setMessages((m) => [...m, { role: "user", text: message }]);
    setValue("");
    setPending(true);
    try {
      const reply = await sendChatMessage(message, getSessionId());
      setMessages((m) => [...m, { role: "agent", text: reply }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: "agent", text: (err as Error).message, error: true },
      ]);
    } finally {
      setPending(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(value);
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(value);
    }
  }

  return (
    <div className="rounded-[24px] border border-[#e5ddd0] bg-cream p-7 shadow-[0_1px_2px_rgba(42,34,27,0.04),0_12px_32px_-12px_rgba(42,34,27,0.10)]">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-ink text-cream">
          <Activity className="size-[18px]" strokeWidth={1.75} />
        </span>
        <div className="-mt-0.5">
          <p className="text-[18px] font-semibold leading-[26px] text-ink">
            Ask Convsync
          </p>
          <p className="text-[14px] leading-[18px] text-ink-soft">
            Scopes your idea in seconds. Engineers on standby.
          </p>
        </div>
      </div>

      <div
        ref={threadRef}
        aria-live="polite"
        className={cn(
          "mt-5 flex flex-col gap-2.5 overflow-y-auto",
          started && "max-h-[300px] pr-1",
        )}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn(
              "whitespace-pre-wrap rounded-[14px] px-4 py-[13px] text-[16.5px] leading-[26px]",
              m.role === "agent"
                ? "self-start bg-sand text-ink"
                : "ml-10 self-end bg-ink text-cream",
              m.error && "bg-[#f3e1d9] text-rust",
            )}
          >
            {m.text}
          </div>
        ))}
        {pending && (
          <div className="flex gap-1 self-start rounded-[14px] bg-sand px-4 py-[18px]" aria-label="Agent is typing">
            {[0, 150, 300].map((d) => (
              <span
                key={d}
                className="size-1.5 animate-bounce rounded-full bg-ink-mute"
                style={{ animationDelay: `${d}ms` }}
              />
            ))}
          </div>
        )}
      </div>

      <form onSubmit={onSubmit}>
        <div className="relative mt-[18px]">
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            maxLength={2000}
            aria-label="Describe your workflow"
            placeholder={
              started
                ? "Reply to Convsync…"
                : "We re-key orders from emailed POs into our ERP. It takes two people most of the day…"
            }
            className={cn(
              "resize-none rounded-[14px] border-[1.5px] border-input bg-cream px-4 py-[14px] text-[16px] leading-[25px] text-ink placeholder:text-[#7a7068] focus-visible:border-pine focus-visible:ring-pine/15 md:text-[16px] [field-sizing:fixed]",
              started ? "h-[76px] min-h-[76px] pr-14" : "h-[104px] min-h-[104px]",
            )}
          />
          {started && (
            <Button
              type="submit"
              size="icon"
              disabled={pending || !value.trim()}
              aria-label="Send"
              className="absolute bottom-3 right-3 size-9 rounded-full bg-pine text-cream hover:bg-pine/90"
            >
              <ArrowUp className="size-4" />
            </Button>
          )}
        </div>

        {!started && (
          <>
            <div className="mt-[18px] flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="h-9 rounded-full bg-sand px-3.5 text-[14.5px] text-ink transition-colors hover:bg-stone"
                >
                  {s}
                </button>
              ))}
            </div>

            <Button
              type="submit"
              disabled={pending || !value.trim()}
              className="mt-[18px] h-[52px] w-full rounded-[12px] bg-pine text-[17px] font-semibold text-cream hover:bg-pine/90 disabled:opacity-100"
            >
              Get my blueprint
            </Button>
          </>
        )}
      </form>

      <p className="mt-5 text-center text-[13px] text-ink-mute">
        Your blueprint: steps, systems, approvals and a pilot timeline.
      </p>
    </div>
  );
}
