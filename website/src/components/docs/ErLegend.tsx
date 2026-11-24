// Crow's-foot notation key. Each icon is a line end: bar = one, circle = zero, fork = many.
const SYMBOLS = [
  { code: "||", label: "Exactly one", zero: false, many: false },
  { code: "|o", label: "Zero or one", zero: true, many: false },
  { code: "|{", label: "One or many", zero: false, many: true },
  { code: "o{", label: "Zero or many", zero: true, many: true },
];

const KEYS = [
  ["PK", "Primary key"],
  ["FK", "Foreign key"],
  ["UK", "Unique key"],
];

export default function ErLegend() {
  return (
    <div className="rounded-xl border bg-card px-4 py-3 text-xs">
      <p className="mb-2 font-medium">Relationship symbols</p>
      <ul className="flex flex-wrap gap-x-6 gap-y-2">
        {SYMBOLS.map((s) => (
          <li key={s.code} className="flex items-center gap-2 whitespace-nowrap">
            <svg viewBox="0 0 40 16" className="h-4 w-10 shrink-0 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <line x1="0" y1="8" x2="40" y2="8" />
              {s.many ? <path d="M30 8 L40 2 M30 8 L40 14" /> : <line x1="35" y1="3" x2="35" y2="13" />}
              {!s.zero && <line x1="28" y1="3" x2="28" y2="13" />}
              {s.zero && <circle cx="22" cy="8" r="3.5" className="fill-card" />}
            </svg>
            <span>{s.label}</span>
            <code className="rounded bg-muted px-1 text-muted-foreground">{s.code}</code>
          </li>
        ))}
      </ul>
      <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1 border-t pt-2">
        {KEYS.map(([k, label]) => (
          <li key={k} className="flex items-center gap-1.5 whitespace-nowrap">
            <code className="rounded bg-muted px-1 font-semibold text-primary">{k}</code>
            <span>{label}</span>
          </li>
        ))}
        <li className="flex items-center gap-1.5 whitespace-nowrap">
          <svg viewBox="0 0 40 16" className="h-4 w-10 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <line x1="0" y1="8" x2="40" y2="8" />
          </svg>
          Identifying
        </li>
        <li className="flex items-center gap-1.5 whitespace-nowrap">
          <svg viewBox="0 0 40 16" className="h-4 w-10 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" aria-hidden>
            <line x1="0" y1="8" x2="40" y2="8" />
          </svg>
          Non-identifying
        </li>
      </ul>
      <p className="mt-2 text-muted-foreground">
        Read each end next to the table it touches: <code>USERS ||--o{"{"} POSTS</code> = one user writes zero or many posts.
      </p>
    </div>
  );
}
