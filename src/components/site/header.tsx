import Link from "next/link";
import { Button } from "@/components/ui/button";

const nav = [
  { label: "Agents", href: "#agents" },
  { label: "Engineering", href: "#engineering" },
  { label: "How we engage", href: "#engage" },
  { label: "Proof", href: "#proof" },
  { label: "Team", href: "#team" },
];

export function Logo({ className = "text-[26px]" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`font-display font-bold tracking-[-0.02em] text-ink ${className}`}
    >
      Convsync
    </Link>
  );
}

export function Header() {
  return (
    <header className="bg-sand">
      <div className="container-page flex h-[88px] items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[16px] font-medium text-ink transition-colors hover:text-pine"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button
          nativeButton={false}
          render={<Link href="#contact" />}
          className="h-11 rounded-full bg-ink px-5 text-[15px] font-semibold text-cream hover:bg-ink/90"
        >
          Talk to an engineer
        </Button>
      </div>
    </header>
  );
}
