import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AskCard } from "./ask-card";
import { AgentDemo } from "./agent-demo";
import { Logo } from "./header";

const h2 = "font-display text-[40px] font-bold leading-[1.02] tracking-[-0.035em] text-ink lg:text-[54px]";

export function Hero() {
  return (
    <section className="bg-sand">
      <div className="container-page grid items-center gap-14 pb-[100px] pt-[60px] lg:grid-cols-[1fr_580px] lg:gap-[100px] lg:pt-[72px]">
        <div>
          <p className="flex items-center gap-2.5 text-[15px] font-semibold text-pine">
            <span className="h-px w-7 bg-pine" />
            Software engineering for the agent era
          </p>
          <h1 className="mt-7 font-display text-[56px] font-extrabold leading-[0.95] tracking-[-0.04em] text-ink sm:text-[76px] lg:text-[96px]">
            We build the software your agents run on.{" "}
            <span className="text-pine">And the agents too.</span>
          </h1>
          <p className="mt-[22px] max-w-[560px] text-[20px] leading-[31px] text-ink-soft">
            Senior engineers who take mid-market AI agents out of pilot and into
            production, inside the systems you already run.
          </p>
          <ul className="mt-[34px] flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-ink">
            {["Agentic automation", "Integration", "Modernization", "Data"].map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <span className="size-[5px] rounded-full bg-ink" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <AskCard />
      </div>
    </section>
  );
}

const pillars = [
  { title: "Visible", text: "Every plan, tool call and self-check, in plain view." },
  { title: "Approved", text: "People decide what matters. Agents handle the rest." },
  { title: "Monitored", text: "Every action logged and watched in production." },
];

export function WatchAgent() {
  return (
    <section className="border-t border-line/70 bg-cream">
      <div className="container-page pb-[105px] pt-[100px]">
        <h2 className={cn(h2, "max-w-[680px]")}>Watch an agent work. Then make the call.</h2>
        <p className="mt-6 max-w-[740px] text-[18px] leading-[27px] text-ink-soft">
          Our agents show their plan, their tools and their reasoning. When a decision
          matters, they stop and ask a person. Here, that&apos;s you.
        </p>
        <div className="mt-[50px] grid gap-6 lg:grid-cols-[1fr_280px]">
          <AgentDemo />
          <div className="grid gap-[14px]">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-[18px] bg-sand p-6">
                <h3 className="font-display text-[22px] font-bold tracking-[-0.01em] text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 text-[16px] leading-[25px] text-ink-soft">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const stats = [
  { label: "Integration", text: "We build the connectors, so agents act in your ERP, CRM and ITSM." },
  { label: "Governance", text: "Approvals, audit trails and rollback from day one." },
  { label: "Ownership", text: "Monitoring, a named owner and a team that stays to run it." },
];

export function Stats() {
  return (
    <section className="border-t border-line/70 bg-sand">
      <div className="container-page grid items-center gap-14 py-[120px] lg:grid-cols-2 lg:gap-[100px]">
        <div>
          <h2 className="font-display text-[46px] font-bold leading-[0.97] tracking-[-0.04em] text-ink lg:text-[64px]">
            <span className="bg-[linear-gradient(transparent_58%,var(--color-honey)_58%)] box-decoration-clone">
              89% of agent pilots
            </span>{" "}
            never reach production.
          </h2>
          <p className="mt-4 text-[15px] text-ink-soft">Gartner, 2026</p>
        </div>
        <dl className="border-t border-[#cfc5b4]">
          {stats.map((s) => (
            <div
              key={s.label}
              className="grid gap-2 border-b border-[#cfc5b4] py-6 sm:grid-cols-[164px_1fr] sm:gap-0"
            >
              <dt className="text-[18px] font-semibold text-ink">{s.label}</dt>
              <dd className="text-[17px] leading-[27px] text-ink-soft">{s.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

const services = [
  { title: "Agentic automation", text: "Production agents with human approvals, monitoring and cited retrieval." },
  { title: "Integration and connectors", text: "Jira, ServiceNow, SAP, financial platforms and custom APIs." },
  { title: "Legacy modernization", text: "Desktop and mainframe apps to modern .NET on Azure, AI-assisted." },
  { title: "Data and product engineering", text: "BI pipelines, IoT data and SaaS products, built to production standard." },
];

export function Services() {
  return (
    <section id="engineering" className="bg-ink text-cream">
      <div className="container-page pb-[105px] pt-[100px]">
        <h2 className="max-w-[720px] font-display text-[40px] font-bold leading-[1.0] tracking-[-0.03em] lg:text-[54px]">
          One team. Four kinds of work. Agents up front.
        </h2>
        <ul className="mt-[55px] border-t border-white/10">
          {services.map((s, i) => (
            <li key={s.title}>
              <Link
                href="#contact"
                className="group grid items-center gap-x-0 gap-y-2 border-b border-white/10 py-8 md:min-h-[113px] md:grid-cols-[80px_549px_1fr_auto] md:py-0"
              >
                <span className="font-mono text-[13px] text-amber">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[28px] font-bold tracking-[-0.02em] lg:text-[36px]">
                  {s.title}
                </span>
                <span className="text-[16px] text-on-dark">{s.text}</span>
                <ArrowRight className="hidden size-5 transition-transform group-hover:translate-x-1 md:block" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

type Autonomy = "observe" | "approval" | "bounded";

const dot: Record<Autonomy, string> = {
  observe: "border-[1.5px] border-ink bg-transparent",
  approval: "bg-rust",
  bounded: "bg-pine",
};

const agents: { cat: string; title: string; text: string; meta: string; level: Autonomy }[] = [
  { cat: "Finance", title: "Invoice exceptions", text: "Matches PO, receipt and invoice, drafts the fix, escalates over threshold.", meta: "ERP · Email · Pilot [N] weeks", level: "approval" },
  { cat: "Sales ops", title: "Order and RFQ intake", text: "Reads emailed POs and RFQs, matches catalogue and price, drafts the order.", meta: "Email · CRM · ERP · Pilot [N] weeks", level: "approval" },
  { cat: "Service", title: "Ticket triage", text: "Classifies, enriches and routes tickets across Jira and ServiceNow.", meta: "Jira · ServiceNow · Pilot [N] weeks", level: "bounded" },
  { cat: "Operations", title: "Field report digest", text: "Turns technician notes and photos into structured reports and follow-ups.", meta: "Mobile · ERP · Pilot [N] weeks", level: "observe" },
  { cat: "IoT / Ops", title: "Device anomaly explainer", text: "Watches telemetry, explains anomalies in plain language, opens a ticket.", meta: "Telemetry · BI · Pilot [N] weeks", level: "observe" },
  { cat: "Compliance", title: "Policy and SOP answers", text: "Answers staff questions from your policies, with the source cited every time.", meta: "SharePoint · Teams · Pilot [N] weeks", level: "bounded" },
];

export function Catalogue() {
  return (
    <section id="agents" className="bg-sand">
      <div className="container-page pb-[120px] pt-[122px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className={h2}>Agents mid-market teams actually need.</h2>
          <Link
            href="#agents"
            className="mb-2 text-[18px] font-semibold text-pine underline decoration-[1.5px] underline-offset-4 hover:decoration-2"
          >
            Browse the catalogue →
          </Link>
        </div>
        <ul className="mt-4 flex flex-wrap gap-5 text-[15px] text-ink-soft">
          {([
            ["observe", "Observe"],
            ["approval", "Act with approval"],
            ["bounded", "Bounded autonomy"],
          ] as const).map(([k, label]) => (
            <li key={k} className="flex items-center gap-2">
              <span className={cn("size-[11px] rounded-full", dot[k])} />
              {label}
            </li>
          ))}
        </ul>
        <div className="mt-[46px] grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((a) => (
            <article
              key={a.title}
              className="rounded-[18px] border border-[#e6ded0] bg-cream px-7 pb-7 pt-[30px] transition-shadow hover:shadow-[0_10px_30px_-14px_rgba(42,34,27,0.18)]"
            >
              <div className="flex items-center justify-between">
                <p className="text-[14px] text-ink-soft">{a.cat}</p>
                <span className={cn("size-[10px] rounded-full", dot[a.level])} />
              </div>
              <h3 className="mt-3.5 font-display text-[24px] font-bold tracking-[-0.01em] text-ink">
                {a.title}
              </h3>
              <p className="mt-2 text-[16.5px] leading-[24px] text-ink-soft">{a.text}</p>
              <p className="mt-4 text-[14.5px] text-ink-soft">{a.meta}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  { title: "Human-in-the-loop", text: "Pause any step for review, approval or input." },
  { title: "Full transparency", text: "Plans, tool calls and self-checks at every step." },
  { title: "Live monitoring", text: "Usage, tool calls and response times per agent and version." },
  { title: "Retrieval with citations", text: "Hybrid and graph retrieval, sources on every answer." },
  { title: "Secure sandbox", text: "Hardware-isolated code execution, no cross-tenant exposure." },
  { title: "MCP and A2A", text: "Hundreds of tools, and agents that work with other agents." },
];

export function Stack() {
  return (
    <section className="border-t border-line/70 bg-cream">
      <div className="container-page grid gap-14 pb-[105px] pt-[105px] lg:grid-cols-[360px_1fr] lg:gap-[56px]">
        <div>
          <h2 className={h2}>Built on our own production stack.</h2>
          <p className="mt-5 text-[18px] leading-[28px] text-ink-soft">
            We didn&apos;t just pick tools. We built and run the platform our agents
            live on, so we know what it takes to keep them safe.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {["Azure", "Tenant isolation", "PII protection", "Role-based access", "Your IP stays yours"].map((c) => (
              <li key={c} className="flex h-[38px] items-center rounded-full bg-sand px-3.5 text-[15px] text-ink">
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {features.map((f, i) => (
            <div key={f.title}>
              <p className="font-mono text-[13px] text-pine">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-[19px] font-semibold text-ink">{f.title}</h3>
              <p className="mt-2 text-[16px] leading-[25px] text-ink-soft">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const phases = [
  { title: "Pilot-to-Production", price: "[PRICE BAND] fixed · [N] weeks", text: "One workflow, live in production, exit criteria agreed up front and a kill switch if it doesn't earn its place." },
  { title: "Build", price: "Scoped per workflow or build", text: "More agents across functions, plus the integrations, modernization and data work they depend on." },
  { title: "Run and improve", price: "Retainer with outcome-linked fees", text: "Monitoring, evals and tuning, with autonomy raised only as controls hold." },
];

export function Phases() {
  return (
    <section id="engage" className="border-t border-line/70 bg-sand">
      <div className="container-page pb-[120px] pt-[110px]">
        <h2 className={cn(h2, "max-w-[860px]")}>Start with one workflow. Prove it in production.</h2>
        <p className="mt-5 max-w-[620px] text-[18px] leading-[28px] text-ink-soft">
          A small pod of senior engineers embeds with your team. You see working
          software early, and you can stop at any phase.
        </p>
        <div className="mt-[58px] grid gap-10 border-t-[3px] border-ink pt-9 md:grid-cols-3 md:gap-0">
          {phases.map((p, i) => (
            <div key={p.title} className="md:pr-10">
              <p className={cn("text-[14px] font-semibold", i === 0 ? "text-pine" : "text-ink-mute")}>
                Phase {i + 1}
              </p>
              <h3 className="mt-3 font-display text-[32px] font-bold tracking-[-0.02em] text-ink">
                {p.title}
              </h3>
              <p className="mt-2.5 text-[16px] text-ink-soft">{p.price}</p>
              <p className="mt-4 text-[16px] leading-[25px] text-ink-soft">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const patterns = [
  { label: "Regulated financial services", title: "Core financial data, live in the CRM", text: "A managed connector ingesting data from core financial platforms into a CRM-based financial cloud." },
  { label: "Mid-market tech and manufacturing", title: "ITSM and ERP, finally talking", text: "Custom connectors so agents and people can read and act across systems." },
];

export function Patterns() {
  return (
    <section id="proof" className="bg-stone">
      <div className="container-page pb-[104px] pt-[100px]">
        <h2 className={h2}>Patterns we&apos;ve shipped.</h2>
        <p className="mt-4 text-[18px] text-ink-soft">
          Client names withheld. The systems, controls and results are real.
        </p>
        <div className="mt-[46px] grid gap-[18px] md:grid-cols-3">
          {patterns.map((p) => (
            <article key={p.title} className="flex min-h-[317px] flex-col rounded-[20px] bg-cream p-8">
              <p className="text-[14px] text-ink-soft">{p.label}</p>
              <h3 className="mt-3 font-display text-[26px] font-bold leading-[30px] tracking-[-0.01em] text-ink">
                {p.title}
              </h3>
              <p className="mt-3 text-[16px] leading-[25px] text-ink-soft">{p.text}</p>
              <p className="mt-auto pt-8 font-display text-[30px] font-bold text-pine">[RESULT]</p>
            </article>
          ))}
          <article className="flex min-h-[317px] flex-col rounded-[20px] bg-ink p-8">
            <p className="text-[14px] text-on-dark">Reference deployment</p>
            <h3 className="mt-3 font-display text-[26px] font-bold leading-[30px] tracking-[-0.01em] text-cream">
              The agent on this page
            </h3>
            <p className="mt-3 text-[16px] leading-[25px] text-on-dark">
              Ask Convsync runs on our own stack, with human handoff, citations and full
              monitoring.
            </p>
            <Link
              href="#top"
              className="mt-auto pt-8 text-[18px] font-semibold text-amber underline decoration-[1.5px] underline-offset-4"
            >
              Try it →
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}

const team = [
  { name: "[Name]", role: "Engineering lead" },
  { name: "[Name]", role: "AI engineer" },
  { name: "[Name]", role: "Integration engineer" },
];

export function Team() {
  return (
    <section id="team" className="bg-sand">
      <div className="container-page pb-[120px] pt-[122px]">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <h2 className={cn(h2, "max-w-[760px]")}>Agents do the work. People stay accountable.</h2>
          <p className="max-w-[420px] pt-2 text-[18px] leading-[28px] text-ink-soft">
            Senior engineers embed with your team, delivered with US partners. Every
            agent we ship has a named human owner.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {team.map((m) => (
            <div key={m.role}>
              <div className="flex aspect-square items-center justify-center rounded-[24px] bg-clay text-[14px] text-ink-mute">
                [PHOTO]
              </div>
              <p className="mt-6 font-display text-[22px] font-bold text-ink">{m.name}</p>
              <p className="mt-1 text-[16px] text-ink-soft">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Cta() {
  return (
    <section id="contact" className="bg-pine text-cream">
      <div className="container-page flex flex-wrap items-center justify-between gap-10 py-[104px]">
        <div>
          <h2 className="font-display text-[48px] font-extrabold leading-[1] tracking-[-0.04em] lg:text-[72px]">
            Will your next pilot ship?
          </h2>
          <p className="mt-5 text-[19px] text-cream/90">
            Ten questions. A readiness score. The three fixes that matter most.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button className="h-[58px] rounded-full bg-cream px-7 text-[18px] font-semibold text-ink hover:bg-cream/90">
            Get your readiness score
          </Button>
          <Button
            variant="outline"
            className="h-[58px] rounded-full border-[1.5px] border-cream bg-transparent px-7 text-[18px] font-semibold text-cream hover:bg-cream/10 hover:text-cream"
          >
            Book a call
          </Button>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-sand">
      <div className="container-page flex flex-wrap items-start justify-between gap-6 pb-12 pt-12">
        <div>
          <Logo className="text-[22px]" />
          <p className="mt-2 text-[15px] text-ink-soft">Convsync LLC, registered in Wyoming, USA</p>
        </div>
        <nav className="flex flex-wrap items-center gap-6 text-[15px] text-ink-soft">
          {["Careers", "Partners", "Privacy", "Terms"].map((l) => (
            <Link key={l} href="#" className="underline underline-offset-4 hover:text-ink">
              {l}
            </Link>
          ))}
          <Link href="#" className="font-mono text-[14px] underline underline-offset-4 hover:text-ink">
            /llms.txt · for AI agents
          </Link>
        </nav>
      </div>
    </footer>
  );
}
