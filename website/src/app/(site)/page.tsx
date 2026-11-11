import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";
import HeroBanner from "@/components/home/HeroBanner";
import Mermaid from "@/components/docs/Mermaid";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getNav } from "@/lib/docs";
import { LEARNING_PATH } from "@/lib/diagrams";
import { SITE } from "@/lib/site";

export default function Home() {
  const nav = getNav();
  const start = nav.find((g) => g.key.startsWith("relationship"))?.items[0]?.href ?? nav[0].items[0].href;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: SITE.title,
    description: SITE.description,
    url: SITE.url,
    provider: { "@type": "Person", name: "Ashukr321", url: "https://github.com/Ashukr321" },
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: "PT10H" },
    offers: { "@type": "Offer", price: 0, priceCurrency: "USD", category: "Free" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <HeroBanner startHref={start} />

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-8">
        <aside className="rounded-lg border-l-4 border-tip-border bg-tip p-5">
          <p className="flex items-center gap-2 font-semibold text-tip-title">
            <Rocket className="size-4" aria-hidden /> Tip
          </p>
          <p className="mt-2 font-semibold">How to use this course</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
            <li>Go in order: each module builds on the one before.</li>
            <li>Read the lesson, study the diagram, then compare the SQL and MongoDB code.</li>
            <li>Finish with Common Mistakes to see what breaks in production.</li>
          </ol>
        </aside>

        <section id="learning-path" className="mt-14 scroll-mt-20">
          <h2 className="text-2xl font-semibold tracking-tight">Learning Path</h2>
          <p className="mt-2 text-muted-foreground">From the four relationship types to production pitfalls.</p>
          <Mermaid chart={LEARNING_PATH} title="Learning path from relationships to tooling" />
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">Modules</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {nav.map((group, i) => (
              <Link key={group.key} href={group.items[0].href} className="group rounded-xl focus-visible:outline-2">
                <Card className="h-full transition-colors group-hover:border-primary/60 group-hover:bg-accent/40">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl" aria-hidden>
                        {group.icon}
                      </span>
                      <Badge variant="secondary">
                        {group.items.length} {group.items.length === 1 ? "lesson" : "lessons"}
                      </Badge>
                    </div>
                    <CardTitle className="mt-3 flex items-center gap-1">
                      <span className="text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                      {group.label}
                      <ArrowRight className="ml-auto size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {group.items.slice(0, 3).map((it) => it.title).join(" · ")}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
