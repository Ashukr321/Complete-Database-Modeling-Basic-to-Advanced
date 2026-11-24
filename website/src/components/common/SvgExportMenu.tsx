"use client";

import { useState } from "react";
import { Popover } from "@base-ui/react/popover";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { exportSvg, type ExportFormat } from "@/lib/svg-export";

type Props = {
  /** The SVG markup to export. */
  svg: string;
  /** Default file name (no extension). */
  name?: string;
  /** Background matching the current theme, offered as the "Theme" swatch. */
  themeBackground?: string;
};

const FORMATS: ExportFormat[] = ["png", "svg", "jpeg"];
const SCALES = [1, 2, 3, 4];
const PADDINGS = [0, 16, 32];

/** Download button with a small panel: format, background, scale, padding, file name. */
export default function SvgExportMenu({ svg, name = "diagram", themeBackground = "#ffffff" }: Props) {
  const [format, setFormat] = useState<ExportFormat>("png");
  const [bg, setBg] = useState<string>(themeBackground);
  const [custom, setCustom] = useState("#ffffff");
  const [scale, setScale] = useState(2);
  const [padding, setPadding] = useState(16);
  const [file, setFile] = useState(name);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const swatches = [
    { label: "Transparent", value: "" },
    { label: "Theme", value: themeBackground },
    { label: "White", value: "#ffffff" },
    { label: "Black", value: "#000000" },
  ];

  async function run() {
    setBusy(true);
    setError("");
    try {
      await exportSvg(svg, { name: file, format, background: bg, scale, padding });
    } catch {
      setError("Export failed. Try SVG.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Popover.Root>
      <Popover.Trigger render={<Button variant="ghost" size="icon-sm" title="Export" aria-label="Export diagram" />}>
        <Download />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner side="bottom" align="end" sideOffset={6} className="z-[60]">
          <Popover.Popup className="w-72 origin-(--transform-origin) rounded-xl border bg-popover p-4 text-sm text-popover-foreground shadow-xl transition-[transform,opacity] duration-200 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
            <Popover.Title className="mb-3 font-medium">Export diagram</Popover.Title>

            <Field label="Format">
              <Segmented value={format} options={FORMATS} onChange={setFormat} render={(f) => f.toUpperCase()} />
            </Field>

            <Field label="Background">
              <div className="flex flex-wrap items-center gap-2">
                {swatches.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    title={s.label}
                    aria-label={`${s.label} background`}
                    aria-pressed={bg === s.value}
                    onClick={() => setBg(s.value)}
                    className={cn(
                      "size-7 rounded-md border shadow-sm transition-transform hover:scale-110",
                      bg === s.value && "ring-2 ring-primary ring-offset-2 ring-offset-popover",
                    )}
                    style={
                      s.value
                        ? { background: s.value }
                        : { background: "repeating-conic-gradient(#bbb 0 25%, #fff 0 50%) 0 0 / 10px 10px" }
                    }
                  />
                ))}
                <label
                  title="Custom color"
                  className={cn(
                    "relative size-7 cursor-pointer overflow-hidden rounded-md border shadow-sm transition-transform hover:scale-110",
                    bg === custom && "ring-2 ring-primary ring-offset-2 ring-offset-popover",
                  )}
                  style={{ background: "conic-gradient(red, yellow, lime, cyan, blue, magenta, red)" }}
                >
                  <span className="sr-only">Custom background color</span>
                  <input
                    type="color"
                    value={custom}
                    onChange={(e) => {
                      setCustom(e.target.value);
                      setBg(e.target.value);
                    }}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </label>
              </div>
              {format === "jpeg" && !bg && <p className="mt-1 text-xs text-muted-foreground">JPEG has no transparency, white is used.</p>}
            </Field>

            {format !== "svg" && (
              <Field label="Scale">
                <Segmented value={scale} options={SCALES} onChange={setScale} render={(s) => `${s}x`} />
              </Field>
            )}

            <Field label="Padding">
              <Segmented value={padding} options={PADDINGS} onChange={setPadding} render={(p) => (p ? `${p}px` : "None")} />
            </Field>

            <Field label="File name">
              <input
                value={file}
                onChange={(e) => setFile(e.target.value)}
                className="h-8 w-full rounded-md border bg-background px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              />
            </Field>

            <Button className="mt-1 w-full" onClick={run} disabled={busy || !svg}>
              {busy ? <Loader2 className="animate-spin" /> : <Download />}
              Download {format.toUpperCase()}
            </Button>
            {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <p className="mb-1.5 text-xs font-medium text-muted-foreground">{label}</p>
      {children}
    </div>
  );
}

function Segmented<T extends string | number>({
  value,
  options,
  onChange,
  render,
}: {
  value: T;
  options: T[];
  onChange: (v: T) => void;
  render: (v: T) => string;
}) {
  return (
    <div className="flex rounded-lg border bg-muted p-0.5">
      {options.map((o) => (
        <button
          key={String(o)}
          type="button"
          aria-pressed={value === o}
          onClick={() => onChange(o)}
          className={cn(
            "flex-1 rounded-md px-2 py-1 text-xs transition-colors",
            value === o ? "bg-background font-medium shadow-sm" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {render(o)}
        </button>
      ))}
    </div>
  );
}
