// Framework-free SVG → file export. Works with any SVG string (Mermaid, D3, charts, icons).

export type ExportFormat = "svg" | "png" | "jpeg";

export type ExportOptions = {
  /** File name without extension. */
  name?: string;
  format?: ExportFormat;
  /** Any CSS color; null/"" = transparent (JPEG falls back to white). */
  background?: string | null;
  /** Pixel multiplier for PNG/JPEG. */
  scale?: number;
  /** Extra space around the drawing, in SVG units. */
  padding?: number;
};

// Only plain color syntax gets into the file (no quotes or tags from user input).
const SAFE_COLOR = /^[#\w(),.%\s-]+$/;

/** Reads the drawing size from viewBox (falls back to width/height, then 1200×800). */
export function svgSize(svg: string) {
  const vb = svg.match(/viewBox="([^"]+)"/)?.[1].trim().split(/[\s,]+/).map(Number);
  if (vb?.length === 4 && vb.every(Number.isFinite)) return { x: vb[0], y: vb[1], w: vb[2], h: vb[3] };
  const num = (a: string) => Number(svg.match(new RegExp(`<svg[^>]*\\s${a}="([\\d.]+)`))?.[1]);
  return { x: 0, y: 0, w: num("width") || 1200, h: num("height") || 800 };
}

/** Standalone SVG: fixed pixel size, optional background and padding, xmlns present. */
export function prepareSvg(svg: string, { background, padding = 0 }: Pick<ExportOptions, "background" | "padding"> = {}) {
  const s = svgSize(svg);
  const box = { x: s.x - padding, y: s.y - padding, w: s.w + padding * 2, h: s.h + padding * 2 };
  const bg = background && SAFE_COLOR.test(background) ? background : null;
  const out = svg.replace(/<svg\b([^>]*)>/, (_, attrs: string) => {
    const kept = attrs
      .replace(/\s(width|height|viewBox|style)="[^"]*"/g, "")
      .replace(/\sxmlns="[^"]*"/, "");
    const rect = bg ? `<rect x="${box.x}" y="${box.y}" width="${box.w}" height="${box.h}" fill="${bg}"/>` : "";
    return `<svg xmlns="http://www.w3.org/2000/svg"${kept} viewBox="${box.x} ${box.y} ${box.w} ${box.h}" width="${box.w}" height="${box.h}">${rect}`;
  });
  return { svg: out, width: box.w, height: box.h };
}

export function downloadUrl(href: string, file: string) {
  const a = document.createElement("a");
  a.href = href;
  a.download = file;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/** Renders the SVG to a raster Blob. */
export async function svgToBlob(svg: string, opts: ExportOptions = {}): Promise<Blob> {
  const format = opts.format === "jpeg" ? "jpeg" : "png";
  const scale = opts.scale ?? 2;
  const bg = opts.background || (format === "jpeg" ? "#ffffff" : null);
  const { svg: out, width, height } = prepareSvg(svg, { background: bg, padding: opts.padding });
  const img = new Image();
  // data: URL (not blob:) keeps the canvas untainted so it can be exported
  img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(out);
  await img.decode();
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Export failed"))), `image/${format}`, 0.95),
  );
}

/** One call to save an SVG string as .svg, .png or .jpeg. */
export async function exportSvg(svg: string, opts: ExportOptions = {}) {
  const format = opts.format ?? "svg";
  const name = (opts.name || "diagram").replace(/[^\w.-]+/g, "-");
  const blob =
    format === "svg"
      ? new Blob([prepareSvg(svg, opts).svg], { type: "image/svg+xml" })
      : await svgToBlob(svg, opts);
  const url = URL.createObjectURL(blob);
  downloadUrl(url, `${name}.${format === "jpeg" ? "jpg" : format}`);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
