// Renders the PWA icons from one SVG. Run: node scripts/generate-icons.mjs
import sharp from "sharp";

const svg = (pad) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#a8b1ff"/><stop offset="1" stop-color="#c86bfa"/></linearGradient></defs>
  <rect width="512" height="512" rx="${pad ? 0 : 112}" fill="#1b1b1f"/>
  <g transform="translate(256 256) scale(${pad ? 0.72 : 1}) translate(-256 -256)" fill="none" stroke="url(#g)" stroke-width="28">
    <ellipse cx="256" cy="150" rx="130" ry="46"/>
    <path d="M126 150v212c0 25 58 46 130 46s130-21 130-46V150"/>
    <path d="M126 256c0 25 58 46 130 46s130-21 130-46"/>
  </g>
</svg>`;

const out = [
  ["public/icons/icon-192x192.png", 192, false],
  ["public/icons/icon-512x512.png", 512, false],
  ["public/icons/icon-maskable-512x512.png", 512, true],
  ["src/app/icon.png", 64, false],
];
for (const [file, size, pad] of out) {
  await sharp(Buffer.from(svg(pad))).resize(size, size).png().toFile(file);
  console.log("wrote", file);
}
