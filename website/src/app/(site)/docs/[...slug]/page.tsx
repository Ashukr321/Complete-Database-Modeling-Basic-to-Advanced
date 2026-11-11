import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Pencil } from "lucide-react";
import Markdown from "@/components/docs/Markdown";
import Mermaid from "@/components/docs/Mermaid";
import { Badge } from "@/components/ui/badge";
import { getDocByHref, getDocs, getHeadings, getNav, readFile, REPO_URL } from "@/lib/docs";
import { DIAGRAMS } from "@/lib/diagrams";

type Props = { params: Promise<{ slug: string[] }> };

const hrefOf = (slug: string[]) => "/docs/" + slug.map((s) => encodeURIComponent(decodeURIComponent(s))).join("/");

export const dynamicParams = false;

export function generateStaticParams() {
  return getDocs().map((d) => ({ slug: d.href.slice("/docs/".length).split("/").map(decodeURIComponent) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doc = getDocByHref(hrefOf((await params).slug));
  if (!doc) return {};
  const group = getNav().find((g) => g.key === doc.group)?.label ?? "";
  const description = doc.lang
    ? `${doc.lang === "sql" ? "MySQL" : "MongoDB"} implementation: ${doc.title} — ${group}.`
    : `${doc.title} — ${group} lesson in the Complete Database Modeling course.`;
  return {
    title: doc.title,
    description,
    alternates: { canonical: doc.href },
    // overriding openGraph drops the inherited image, so point back at the site-wide one
    openGraph: { title: doc.title, description, url: doc.href, type: "article", images: "/opengraph-image" },
    twitter: { card: "summary_large_image", title: doc.title, description, images: "/opengraph-image" },
  };
}

export default async function DocPage({ params }: Props) {
  const doc = getDocByHref(hrefOf((await params).slug));
  if (!doc) notFound();

  const raw = readFile(doc.file);
  const source = doc.lang ? `# ${doc.title}\n\n\`\`\`${doc.lang}\n${raw}\n\`\`\`\n` : raw;
  const headings = doc.lang ? [] : getHeadings(raw);
  const diagram = DIAGRAMS[doc.file];

  const docs = getDocs();
  const i = docs.indexOf(doc);
  const prev = docs[i - 1];
  const next = docs[i + 1];
  const group = getNav().find((g) => g.key === doc.group);

  return (
    <div className="mx-auto flex max-w-6xl gap-10 px-4 py-10 sm:px-8 lg:py-14">
      <article className="min-w-0 flex-1">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <Badge variant="secondary">
            {group?.icon} {group?.label}
          </Badge>
          {doc.lang && <Badge variant="outline">{doc.lang === "sql" ? "MySQL" : "MongoDB"}</Badge>}
        </div>

        {diagram && (
          <>
            <Markdown source={source.split(/\r?\n(?=## )/)[0]} file={doc.file} />
            <Mermaid chart={diagram} title={`${doc.title} diagram`} />
            <Markdown source={source.split(/\r?\n(?=## )/).slice(1).join("\n")} file={doc.file} />
          </>
        )}
        {!diagram && <Markdown source={source} file={doc.file} />}

        <div className="mt-12 flex justify-end">
          <a
            href={`${REPO_URL}/edit/main/${doc.file}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            <Pencil className="size-3.5" /> Edit this page on GitHub
          </a>
        </div>

        <nav aria-label="Pagination" className="mt-6 grid gap-4 border-t pt-6 sm:grid-cols-2">
          {prev ? (
            <Link href={prev.href} className="rounded-lg border p-4 transition-colors hover:border-primary">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <ArrowLeft className="size-3" /> Previous
              </span>
              <span className="mt-1 block font-medium text-primary">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={next.href} className="rounded-lg border p-4 text-right transition-colors hover:border-primary">
              <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                Next <ArrowRight className="size-3" />
              </span>
              <span className="mt-1 block font-medium text-primary">{next.title}</span>
            </Link>
          )}
        </nav>
      </article>

      {headings.length > 0 && (
        <aside className="sticky top-24 hidden max-h-[calc(100dvh-8rem)] w-56 shrink-0 self-start overflow-y-auto xl:block">
          <p className="mb-3 text-sm font-semibold">On this page</p>
          <ul className="space-y-1.5 border-l text-sm">
            {headings.map((h) => (
              <li key={h.id} className={h.depth === 3 ? "pl-6" : "pl-3"}>
                <a href={`#${h.id}`} className="block text-muted-foreground transition-colors hover:text-primary">
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
}
