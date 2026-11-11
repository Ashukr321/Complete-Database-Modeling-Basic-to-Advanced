import Link from "next/link";
import { isValidElement, type ReactNode } from "react";
import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import Mermaid from "./Mermaid";
import { resolveLink } from "@/lib/docs";

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
}

export default function Markdown({ source, file }: { source: string; file: string }) {
  return (
    <div className="doc">
      <ReactMarkdown
        // keep file:/// links (the repo's own cross-links) so resolveLink can map them; sanitize the rest
        urlTransform={(url) => (/^file:/i.test(url) ? url : defaultUrlTransform(url))}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, [rehypeHighlight, { plainText: ["mermaid"] }]]}
        components={{
          a: ({ href = "", children }) => {
            if (!href) return <span>{children}</span>;
            const to = resolveLink(file, href);
            return to.startsWith("/") || to.startsWith("#") ? (
              <Link href={to}>{children}</Link>
            ) : (
              <a href={to} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            );
          },
          pre: ({ children }) => {
            const code = isValidElement<{ className?: string }>(children) ? children : null;
            if (code?.props.className?.includes("language-mermaid")) {
              return <Mermaid chart={textOf(children).trim()} />;
            }
            return <pre>{children}</pre>;
          },
          table: ({ children }) => (
            <div className="table-wrap">
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
