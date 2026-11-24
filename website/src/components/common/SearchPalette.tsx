"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search } from "lucide-react";
import type { NavGroup } from "./SidebarNav";

const noop = () => () => {};
const isTyping = (t: EventTarget | null) =>
  t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));

export const toggleSidebar = () => {
  const el = document.documentElement;
  el.dataset.sidebar = el.dataset.sidebar === "closed" ? "open" : "closed";
};

// Every typed word must appear (cmdk's default fuzzy match is too loose).
function filter(value: string, search: string, keywords?: string[]) {
  const hay = `${value} ${keywords?.join(" ") ?? ""}`.toLowerCase();
  return search.toLowerCase().split(/\s+/).filter(Boolean).every((w) => hay.includes(w)) ? 1 : 0;
}

export default function SearchPalette({ nav }: { nav: NavGroup[] }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const isMac = useSyncExternalStore(noop, () => /Mac|iPhone|iPad/.test(navigator.platform), () => false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.code === "KeyK") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (mod && e.code === "KeyB") {
        e.preventDefault();
        toggleSidebar();
      } else if (!mod && !e.altKey && e.code === "Slash" && !isTyping(e.target)) {
        e.preventDefault();
        if (e.shiftKey) toggleSidebar();
        else setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search topics"
        className="flex h-8 items-center gap-2 rounded-md border bg-background px-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:w-56"
      >
        <Search className="size-4" />
        <span className="hidden sm:inline">Search…</span>
        <kbd className="ml-auto hidden rounded border bg-muted px-1.5 font-mono text-[11px] sm:inline">
          {isMac ? "⌘" : "Ctrl"} K
        </kbd>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Search topics"
        filter={filter}
        overlayClassName="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs"
        contentClassName="fixed top-[15vh] left-1/2 z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-2xl"
      >
        <div className="flex items-center gap-2 border-b px-3">
          <Search className="size-4 text-muted-foreground" />
          <Command.Input
            placeholder="Search topics…"
            className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <Command.List className="max-h-[60vh] overflow-y-auto p-2">
          <Command.Empty className="py-6 text-center text-sm text-muted-foreground">No results.</Command.Empty>
          {nav.map((group) => (
            <Command.Group
              key={group.key}
              heading={`${group.icon} ${group.label}`}
              className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-muted-foreground"
            >
              {group.items.map((item) => (
                <Command.Item
                  key={item.href}
                  value={item.href}
                  keywords={[item.title, group.label]}
                  onSelect={() => {
                    setOpen(false);
                    router.push(item.href);
                  }}
                  className="flex cursor-pointer items-center justify-between gap-3 rounded-md px-2 py-2 text-sm data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary"
                >
                  <span className="truncate">{item.title}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{group.label}</span>
                </Command.Item>
              ))}
            </Command.Group>
          ))}
        </Command.List>
      </Command.Dialog>
    </>
  );
}
