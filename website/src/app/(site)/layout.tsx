import SiteHeader from "@/components/common/SiteHeader";
import SidebarNav from "@/components/common/SidebarNav";
import { getNav } from "@/lib/docs";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const nav = getNav();
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <SiteHeader nav={nav} />
      <div className="flex">
        <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-72 shrink-0 overflow-y-auto border-r bg-card px-3 py-6 lg:block">
          <SidebarNav nav={nav} />
        </aside>
        <main id="main" className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </>
  );
}
