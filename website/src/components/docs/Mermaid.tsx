"use client";

import { useEffect, useId, useState } from "react";
import { useTheme } from "next-themes";

const THEMES = {
  dark: {
    background: "#202127",
    primaryColor: "#262842",
    primaryTextColor: "#dfdfd6",
    primaryBorderColor: "#a8b1ff",
    lineColor: "#a8b1ff",
    secondaryColor: "#3f1f52",
    tertiaryColor: "#1b1b1f",
    textColor: "#dfdfd6",
    nodeTextColor: "#dfdfd6",
    darkMode: true,
    rowOdd: "#202127",
    rowEven: "#262842",
  },
  light: {
    background: "#f6f6f7",
    primaryColor: "#eef0fb",
    primaryTextColor: "#213547",
    primaryBorderColor: "#3451b2",
    lineColor: "#3451b2",
    secondaryColor: "#f3e8fd",
    tertiaryColor: "#ffffff",
    textColor: "#213547",
    nodeTextColor: "#213547",
    rowOdd: "#ffffff",
    rowEven: "#eef0fb",
  },
};

export default function Mermaid({ chart, title }: { chart: string; title?: string }) {
  const id = "mmd" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!resolvedTheme) return;
    let alive = true;
    const mode = resolvedTheme === "dark" ? "dark" : "light";
    import("mermaid").then(async ({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: "base",
        fontFamily: "var(--font-sans), sans-serif",
        themeVariables: THEMES[mode],
      });
      try {
        const out = await mermaid.render(`${id}-${mode}`, chart);
        if (alive) setSvg(out.svg);
      } catch {
        if (alive) setFailed(true);
      }
    }).catch(() => alive && setFailed(true)); // chunk failed to load (offline / stale deploy)
    return () => {
      alive = false;
    };
  }, [chart, id, resolvedTheme]);

  if (failed) {
    return (
      <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
        <code>{chart}</code>
      </pre>
    );
  }

  return (
    <figure
      role="img"
      aria-label={title ?? "Diagram"}
      className="my-6 flex min-h-40 items-center justify-center overflow-x-auto rounded-xl border bg-card p-4 [&_svg]:h-auto [&_svg]:max-w-full"
    >
      {svg ? (
        <div dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <div className="h-32 w-full animate-pulse rounded-lg bg-muted" />
      )}
    </figure>
  );
}
