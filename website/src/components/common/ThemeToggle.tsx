"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Laptop, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const ORDER = ["system", "light", "dark"] as const;
const ICON = { system: Laptop, light: Sun, dark: Moon };
const LABEL = { system: "Auto", light: "Light", dark: "Dark" };
const noop = () => () => {};

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  // false during SSR/hydration, true after: avoids a theme-icon hydration mismatch
  const mounted = useSyncExternalStore(noop, () => true, () => false);

  const current = (mounted && (theme as (typeof ORDER)[number])) || "system";
  const Icon = ICON[current] ?? Laptop;
  const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(next)}
      aria-label={`Theme: ${LABEL[current]}. Switch to ${LABEL[next]}`}
    >
      <Icon />
      <span className="hidden sm:inline">{LABEL[current]}</span>
    </Button>
  );
}
