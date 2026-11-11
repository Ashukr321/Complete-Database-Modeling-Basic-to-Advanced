"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, FileCode2 } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

export type NavGroup = {
  key: string;
  label: string;
  icon: string;
  items: { href: string; title: string; lang?: string }[];
};

export default function SidebarNav({ nav, onNavigate }: { nav: NavGroup[]; onNavigate?: () => void }) {
  const pathname = decodeURI(usePathname());

  return (
    <nav aria-label="Course" className="space-y-1 text-sm">
      <Link
        href="/"
        onClick={onNavigate}
        className={cn(
          "block rounded-md px-3 py-2 font-semibold hover:text-primary",
          pathname === "/" && "text-primary",
        )}
      >
        🏠 Home
      </Link>
      {nav.map((group) => {
        const open = group.items.some((i) => decodeURI(i.href) === pathname);
        return (
          <Collapsible key={group.key} defaultOpen={open}>
            <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-md px-3 py-2 text-left font-semibold hover:text-primary">
              <span>
                <span aria-hidden className="mr-2">
                  {group.icon}
                </span>
                {group.label}
              </span>
              <ChevronRight className="size-4 text-muted-foreground transition-transform group-data-[panel-open]:rotate-90" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ul className="mb-2 ml-4 border-l pl-2">
                {group.items.map((item) => {
                  const active = decodeURI(item.href) === pathname;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onNavigate}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-1.5 rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:text-foreground",
                          active && "bg-primary/10 font-medium text-primary hover:text-primary",
                        )}
                      >
                        {item.lang && <FileCode2 className="size-3.5 shrink-0" aria-hidden />}
                        <span className="truncate">{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </nav>
  );
}
