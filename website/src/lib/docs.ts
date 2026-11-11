import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";

// The website renders the repo's own markdown/code, which lives one folder up.
export const CONTENT_ROOT = path.resolve(process.cwd(), "..");
export const REPO_URL =
  "https://github.com/Ashukr321/Complete-Database-Modeling-Basic-to-Advanced";
const REPO_NAME = "Complete-Database-Modeling-Basic-to-Advanced/";

const SKIP_DIRS = new Set(["website", "node_modules", ".git", ".claude"]);
const CODE_EXT: Record<string, "javascript" | "sql"> = {
  ".js": "javascript",
  ".sql": "sql",
};

/** Sidebar groups in learning order. Folders not listed are appended. */
export const GROUPS: { key: string; label: string; icon: string }[] = [
  { key: "README", label: "Overview", icon: "🏠" },
  { key: "relationship/one_to_one", label: "One-to-One", icon: "🔗" },
  { key: "relationship/one_to_many", label: "One-to-Many", icon: "🔗" },
  { key: "relationship/many_to_one", label: "Many-to-One", icon: "🔗" },
  { key: "relationship/many_to_many", label: "Many-to-Many", icon: "🔗" },
  { key: "ER-Diagrams", label: "ER Diagrams", icon: "📐" },
  { key: "Entity-Design", label: "Entity Design", icon: "🏛️" },
  { key: "MongoDB-Schema-Design-Patterns", label: "Schema Patterns", icon: "🧩" },
  { key: "Normalization-vs-Denormalization", label: "Normalization", icon: "⚖️" },
  { key: "Database-Indexing", label: "Indexing", icon: "⚡" },
  { key: "Data-Validation", label: "Data Validation", icon: "🛡️" },
  { key: "Common-Data-Modeling-Mistakes", label: "Common Mistakes", icon: "🚫" },
  { key: "Data-Modeling-Tools", label: "Tooling", icon: "🛠️" },
];

export type Doc = {
  /** repo-relative posix path, e.g. relationship/one_to_one/one-to-one.md */
  file: string;
  href: string;
  title: string;
  group: string;
  lang?: "javascript" | "sql";
};

export type Heading = { id: string; text: string; depth: 2 | 3 };

const stripEmoji = (s: string) =>
  s.replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, "").trim();

/** Strip inline markdown so slugs match what rehype-slug sees in the HTML. */
const plainText = (s: string) =>
  s
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .trim();

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(path.relative(CONTENT_ROOT, full).split(path.sep).join("/"));
  }
  return out;
}

/** Group = top folder, or top/sub when the top folder holds only subfolders. */
export function groupOf(file: string, files: string[]): string {
  const [top, sub] = file.split("/");
  const topHasFiles = files.some((f) => f.split("/").length === 2 && f.startsWith(top + "/"));
  return topHasFiles || !sub ? top : `${top}/${sub}`;
}

export function hrefFor(file: string): string {
  const ext = path.posix.extname(file);
  const base = ext === ".md" ? file.slice(0, -3) : file.slice(0, -ext.length) + "-" + ext.slice(1);
  return "/docs/" + base.split("/").map(encodeURIComponent).join("/");
}

function sortKey(doc: Doc): string {
  const name = path.posix.basename(doc.file).toLowerCase();
  const folder = doc.group.split("/").pop()!.toLowerCase().replace(/_/g, "-");
  if (name === "readme.md") return "0";
  if (name === `${folder}.md`) return "1";
  return (doc.lang ? "3" : "2") + doc.file.toLowerCase();
}

let cache: Doc[] | null = null;

export function getDocs(): Doc[] {
  if (cache) return cache;
  const files = walk(CONTENT_ROOT).filter((f) => {
    const ext = path.posix.extname(f);
    return f.includes("/") && (ext === ".md" || ext in CODE_EXT);
  });
  const docs = files.map((file): Doc => {
    const ext = path.posix.extname(file);
    const lang = CODE_EXT[ext];
    let title = path.posix.basename(file);
    if (!lang) {
      const h1 = readFile(file).match(/^#\s+(.+)$/m)?.[1];
      if (h1) title = stripEmoji(plainText(h1));
    }
    return { file, href: hrefFor(file), title, group: groupOf(file, files), lang };
  });
  const order = (g: string) => {
    const i = GROUPS.findIndex((x) => x.key === g);
    return i === -1 ? GROUPS.length : i;
  };
  cache = docs.sort(
    (a, b) => order(a.group) - order(b.group) || a.group.localeCompare(b.group) || sortKey(a).localeCompare(sortKey(b)),
  );
  return cache;
}

export function getNav() {
  const docs = getDocs();
  const keys = [...new Set(docs.map((d) => d.group))];
  return keys.map((key) => {
    const meta = GROUPS.find((g) => g.key === key);
    return {
      key,
      label: meta?.label ?? key.replace(/[-_]/g, " "),
      icon: meta?.icon ?? "📄",
      items: docs.filter((d) => d.group === key).map(({ href, title, lang }) => ({ href, title, lang })),
    };
  });
}

export function readFile(file: string): string {
  return fs.readFileSync(path.join(CONTENT_ROOT, file), "utf8");
}

export function getDocByHref(href: string): Doc | undefined {
  return getDocs().find((d) => d.href === href);
}

/** h2/h3 headings for the "On this page" panel; ids match rehype-slug. */
export function getHeadings(markdown: string): Heading[] {
  const slugger = new GithubSlugger();
  const out: Heading[] = [];
  let inFence = false;
  for (const line of markdown.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    const m = !inFence && line.match(/^(#{1,3})\s+(.+?)\s*#*$/);
    if (!m) continue;
    const text = plainText(m[2]);
    const id = slugger.slug(text);
    if (m[1].length > 1) out.push({ id, text: stripEmoji(text), depth: m[1].length as 2 | 3 });
  }
  return out;
}

/**
 * Map a link found inside a doc to a site URL. The repo's docs use absolute
 * file:///e:/... links from the author's machine plus relative ones.
 */
export function resolveLink(fromFile: string, href: string, docs: Doc[] = getDocs()): string {
  if (/^(https?:|mailto:|#)/i.test(href)) return href;
  let target: string;
  const [rawPath, hash] = href.split("#");
  if (/^file:/i.test(rawPath)) {
    const decoded = decodeURIComponent(rawPath);
    const at = decoded.toLowerCase().indexOf(REPO_NAME.toLowerCase());
    if (at === -1) return href;
    target = decoded.slice(at + REPO_NAME.length);
  } else {
    target = path.posix.join(path.posix.dirname(fromFile), decodeURIComponent(rawPath));
  }
  target = target.replace(/\/+$/, "");
  const suffix = hash ? `#${hash}` : "";
  const exact = docs.find((d) => d.file === target);
  if (exact) return exact.href + suffix;
  const inDir = docs.find((d) => d.file.startsWith(target + "/"));
  if (inDir) return inDir.href;
  return `${REPO_URL}/blob/main/${target.split("/").map(encodeURIComponent).join("/")}`;
}
