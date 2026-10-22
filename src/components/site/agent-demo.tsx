"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Read the PO from the shared inbox",
    detail: "mail.get_attachment → 14 line items",
    mono: true,
  },
  {
    title: "Match items to the catalogue and price list",
    detail: "erp.match_skus → 13 matched, 1 unknown",
    mono: true,
  },
  {
    title: "Check its own work",
    detail:
      'Unknown item "HT-4410B" looks like a superseded part. Suggest HT-4410C (source: 2024 catalogue note).',
  },
  {
    title: "Approved by you. Sales order SO-51882 created.",
    detail: "Customer confirmation sent · audit trail saved · 2 sources cited",
    final: true,
  },
];

export function AgentDemo() {
  const [visible, setVisible] = useState(steps.length);

  useEffect(() => {
    if (visible >= steps.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), 650);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div className="overflow-hidden rounded-[16px] border border-line bg-paper">
      <div className="flex h-[58px] items-center justify-between border-b border-line px-[22px]">
        <p className="text-[14px] text-ink-soft">
          <span className="font-semibold text-ink">Order intake agent</span>
          <span className="ml-3">· PO-77310 from Halvorsen Tools</span>
        </p>
        <Badge className="h-6 rounded-full bg-sand px-2.5 text-[12px] font-normal text-ink-soft">
          Sample data
        </Badge>
      </div>

      <ol className="space-y-[22px] px-[22px] pb-[55px] pt-[25px]">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className={cn(
              "flex gap-4 transition-all duration-500",
              i < visible ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
            )}
          >
            <span
              className={cn(
                "mt-px flex size-6 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold text-cream",
                step.final ? "bg-rust" : "bg-ink",
              )}
            >
              {i + 1}
            </span>
            <div>
              <p className="text-[18px] font-semibold leading-[25px] text-ink">
                {step.title}
              </p>
              <p
                className={cn(
                  "mt-[3px] text-ink-soft",
                  step.mono
                    ? "font-mono text-[13.5px] leading-[20px]"
                    : "text-[14px] leading-[20px]",
                )}
              >
                {step.detail}
              </p>
              {step.final && (
                <Button
                  variant="outline"
                  onClick={() => setVisible(0)}
                  className="mt-2.5 h-10 rounded-full border-line bg-transparent px-4 text-[14px] font-normal text-ink hover:bg-sand"
                >
                  Replay
                </Button>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
