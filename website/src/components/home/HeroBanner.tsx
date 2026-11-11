import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STATS = [
  { value: "4", label: "Relationship types" },
  { value: "20+", label: "Entity designs" },
  { value: "2", label: "Databases" },
  { value: "50+", label: "Diagrams" },
];

type Table = { x: number; y: number; name: string; rows: string[]; delay: string };
const TABLES: Table[] = [
  { x: 16, y: 24, name: "users", rows: ["🔑 id", "email", "name"], delay: "0s" },
  { x: 256, y: 8, name: "orders", rows: ["🔑 id", "🔗 user_id", "total"], delay: "1.2s" },
  { x: 136, y: 196, name: "products", rows: ["🔑 id", "title", "price"], delay: "2.4s" },
];

/** Animated mini ER diagram: tables float, relationship lines flow. */
function SchemaArt() {
  return (
    <svg viewBox="0 0 400 330" className="h-auto w-full max-w-md" role="img" aria-label="Animated diagram of users, orders and products tables linked by relationships">
      <defs>
        <linearGradient id="hero-line" x1="0" x2="1">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--tip-border)" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#hero-line)" strokeWidth="2" className="hero-flow">
        <path d="M144 70 C 200 70, 200 56, 256 56" />
        <path d="M320 120 C 320 170, 280 220, 264 236" />
        <path d="M80 136 C 80 200, 110 240, 136 244" />
      </g>
      <g className="fill-primary text-[11px] font-bold">
        <text x="150" y="62">1</text>
        <text x="240" y="48">N</text>
        <text x="326" y="140">N</text>
        <text x="272" y="256">M</text>
      </g>
      {TABLES.map((t) => (
        <g key={t.name} className="hero-float" style={{ animationDelay: t.delay }}>
          <rect x={t.x} y={t.y} width="128" height="112" rx="10" className="fill-card stroke-border" strokeWidth="1.5" />
          <rect x={t.x} y={t.y} width="128" height="30" rx="10" className="fill-primary/15" />
          <text x={t.x + 12} y={t.y + 20} className="fill-primary text-[13px] font-semibold">
            {t.name}
          </text>
          {t.rows.map((r, i) => (
            <text key={r} x={t.x + 12} y={t.y + 52 + i * 22} className="fill-muted-foreground font-mono text-[11px]">
              {r}
            </text>
          ))}
        </g>
      ))}
    </svg>
  );
}

export default function HeroBanner({ startHref }: { startHref: string }) {
  return (
    <section className="relative isolate overflow-hidden border-b">
      {/* glow + grid backdrop */}
      <div aria-hidden className="hero-grid absolute inset-0 -z-10" />
      <div aria-hidden className="absolute -top-32 -left-24 -z-10 size-96 rounded-full bg-primary/25 blur-3xl" />
      <div aria-hidden className="absolute -right-24 -bottom-40 -z-10 size-96 rounded-full bg-tip-border/20 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-8 md:py-20 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <Badge variant="outline" className="mb-5 gap-1.5 border-primary/40 bg-primary/10 text-primary">
            <span className="size-1.5 animate-pulse rounded-full bg-primary" />
            Basic → Advanced · SQL & MongoDB
          </Badge>
          <h1 className="text-4xl leading-[1.1] font-bold tracking-tight text-balance sm:text-5xl">
            Design databases{" "}
            <span className="bg-gradient-to-r from-primary to-tip-border bg-clip-text text-transparent">
              that scale.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Learn data modeling step by step, in plain English. Relationships, entity design, schema patterns,
            indexing and validation — every lesson with real SQL &amp; Mongo code and a diagram.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={startHref} className={cn(buttonVariants({ size: "lg" }), "h-11 px-5 text-base")}>
              Start learning <ArrowRight />
            </Link>
            <Link href="#learning-path" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-5 text-base")}>
              <BookOpen /> Learning path
            </Link>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-xl border bg-card/60 p-3 backdrop-blur">
                <dt className="text-xs text-muted-foreground">{s.label}</dt>
                <dd className="text-lg font-bold text-foreground">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex justify-center">
          <SchemaArt />
        </div>
      </div>
    </section>
  );
}
