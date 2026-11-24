"use client";

import { useState, type ReactNode } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import SvgExportMenu from "@/components/common/SvgExportMenu";

type Props = {
  /** Rendered SVG markup; empty while loading (shows a skeleton). */
  svg: string;
  title?: string;
  /** Shown above the diagram, and at the top of the full-screen view. */
  legend?: ReactNode;
  /** Theme background, offered in the export menu. */
  background?: string;
};

/**
 * Any SVG diagram with a toolbar: export (format, background, scale) and an
 * animated full-screen view with zoom. Knows nothing about Mermaid.
 */
export default function DiagramFrame({ svg, title = "Diagram", legend, background }: Props) {
  const [zoom, setZoom] = useState(1);
  const name = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "diagram";
  const exportMenu = svg && <SvgExportMenu svg={svg} name={name} themeBackground={background} />;

  return (
    <Dialog.Root onOpenChange={() => setZoom(1)}>
      <div className="my-6">
        {legend && svg && <div className="mb-3">{legend}</div>}
        <figure className="group relative rounded-xl border bg-card">
          {svg && (
            <div className="absolute top-2 right-2 z-10 flex gap-1 rounded-lg border bg-background/80 p-0.5 backdrop-blur transition-opacity sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100 sm:has-aria-expanded:opacity-100">
              {exportMenu}
              <Dialog.Trigger render={<Button variant="ghost" size="icon-sm" title="Full screen" aria-label="Open diagram full screen" />}>
                <Maximize2 />
              </Dialog.Trigger>
            </div>
          )}
          <div
            role="img"
            aria-label={title}
            className="flex min-h-40 items-center justify-center overflow-x-auto p-4 [&_svg]:h-auto [&_svg]:max-w-full"
          >
            {svg ? (
              <div dangerouslySetInnerHTML={{ __html: svg }} />
            ) : (
              <div className="h-32 w-full animate-pulse rounded-lg bg-muted" />
            )}
          </div>
        </figure>
      </div>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="diagram-full fixed inset-2 z-50 flex flex-col overflow-hidden rounded-2xl border bg-card shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1.2,0.36,1)] outline-none data-ending-style:scale-90 data-ending-style:opacity-0 data-ending-style:blur-sm data-starting-style:scale-75 data-starting-style:opacity-0 data-starting-style:blur-sm sm:inset-6">
          <div className="flex items-center gap-1 border-b px-3 py-2">
            <Dialog.Title className="mr-auto truncate text-sm font-medium">{title}</Dialog.Title>
            <Button variant="ghost" size="icon-sm" title="Zoom out" aria-label="Zoom out" onClick={() => setZoom((z) => Math.max(0.25, z - 0.25))}>
              <ZoomOut />
            </Button>
            <button className="w-12 text-xs tabular-nums text-muted-foreground" title="Reset zoom" onClick={() => setZoom(1)}>
              {Math.round(zoom * 100)}%
            </button>
            <Button variant="ghost" size="icon-sm" title="Zoom in" aria-label="Zoom in" onClick={() => setZoom((z) => Math.min(4, z + 0.25))}>
              <ZoomIn />
            </Button>
            {exportMenu}
            <Dialog.Close render={<Button variant="ghost" size="icon-sm" title="Close (Esc)" aria-label="Close full screen" />}>
              <X />
            </Dialog.Close>
          </div>
          {legend && <div className="border-b px-4 py-3">{legend}</div>}
          <div className="flex-1 overflow-auto p-6">
            <div
              className="mx-auto w-fit origin-top transition-transform duration-200 [&_svg]:h-auto [&_svg]:max-w-none"
              style={{ transform: `scale(${zoom})` }}
              dangerouslySetInnerHTML={{ __html: fullSvg(svg) }}
            />
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/** Same SVG sized to fill the screen; its root id is renamed so it doesn't clash with the inline copy. */
function fullSvg(svg: string) {
  const id = svg.match(/<svg[^>]*\sid="([^"]+)"/)?.[1];
  const vb = svg.match(/viewBox="[\d.\-]+ [\d.\-]+ ([\d.]+)/);
  const w = vb ? Math.max(Number(vb[1]), Math.min(1400, Number(vb[1]) * 2.2)) : 1000;
  let out = svg.replace(/(<svg[^>]*?)\s(?:width|height)="[^"]*"/g, "$1").replace(/(<svg[^>]*?)\sstyle="[^"]*"/, "$1");
  out = out.replace(/<svg\b/, `<svg style="width:min(${w}px, 90vw)"`);
  // rename the id everywhere: marker ids (ER crow's feet) are prefixed with it, and so are their url(#...) refs
  if (id) out = out.split(id).join(`${id}-full`);
  return out;
}
