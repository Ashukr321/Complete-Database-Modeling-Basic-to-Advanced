// @vitest-environment node
import { describe, it, expect } from "vitest";
import { getDocs, getHeadings, hrefFor, resolveLink, REPO_URL, type Doc } from "@/lib/docs";

const docs: Doc[] = [
  { file: "relationship/one_to_one/one-to-one.md", href: hrefFor("relationship/one_to_one/one-to-one.md"), title: "1:1", group: "relationship/one_to_one" },
  { file: "relationship/one_to_one/how-to-identify.md", href: hrefFor("relationship/one_to_one/how-to-identify.md"), title: "id", group: "relationship/one_to_one" },
];

describe("hrefFor", () => {
  it("drops .md and keeps code extensions distinct", () => {
    expect(hrefFor("a/b.md")).toBe("/docs/a/b");
    expect(hrefFor("a/x.js")).toBe("/docs/a/x-js");
    expect(hrefFor("a/x.sql")).toBe("/docs/a/x-sql");
  });
});

describe("resolveLink", () => {
  const from = "relationship/one_to_one/one-to-one.md";

  it("maps the author's absolute file:/// links to site routes", () => {
    const href =
      "file:///e:/Job%20switch/backend/Complete-Database-Modeling-Basic-to-Advanced/relationship/one_to_one/how-to-identify.md";
    expect(resolveLink(from, href, docs)).toBe("/docs/relationship/one_to_one/how-to-identify");
  });

  it("maps a folder link to its first doc", () => {
    const href = "file:///e:/x/Complete-Database-Modeling-Basic-to-Advanced/relationship/one_to_one";
    expect(resolveLink(from, href, docs)).toBe(docs[0].href);
  });

  it("resolves relative links and keeps the hash", () => {
    expect(resolveLink(from, "./how-to-identify.md#rules", docs)).toBe("/docs/relationship/one_to_one/how-to-identify#rules");
  });

  it("sends unknown files (e.g. PDFs) to GitHub and leaves external links alone", () => {
    expect(resolveLink(from, "./One To One.pdf", docs)).toBe(`${REPO_URL}/blob/main/relationship/one_to_one/One%20To%20One.pdf`);
    expect(resolveLink(from, "https://example.com", docs)).toBe("https://example.com");
    expect(resolveLink(from, "#top", docs)).toBe("#top");
  });
});

describe("getHeadings", () => {
  it("returns h2/h3 with rehype-slug compatible ids, ignoring code fences", () => {
    const md = "# T\n## 🟢 When **to** use?\n```\n## not a heading\n```\n### `code` A\n## When to use?";
    expect(getHeadings(md)).toEqual([
      { id: "-when-to-use", text: "When to use?", depth: 2 },
      { id: "code-a", text: "code A", depth: 3 },
      { id: "when-to-use", text: "When to use?", depth: 2 },
    ]);
  });
});

describe("getDocs (real repo content)", () => {
  it("finds every lesson with a unique URL", () => {
    const all = getDocs();
    expect(all.length).toBeGreaterThan(40);
    expect(new Set(all.map((d) => d.href)).size).toBe(all.length);
    expect(all.some((d) => d.file.startsWith("website/"))).toBe(false);
  });
});
