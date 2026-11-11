# syntax=docker/dockerfile:1
#
# Build context must be the REPO ROOT: the site renders the markdown lessons that
# live next to website/. From the repo root:
#   docker build -f website/Dockerfile -t db-modeling-website .
# or from website/:
#   docker compose up --build

# mermaid's parser and jsdom need Node >= 22.12
ARG NODE_VERSION=22

# ---- deps: install node_modules from the lockfile ----
FROM node:${NODE_VERSION}-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /repo/website
COPY website/package.json website/package-lock.json website/.npmrc ./
# HUSKY=0: skip git hooks setup (no .git inside the image)
RUN HUSKY=0 npm ci

# ---- builder: prerender every lesson page ----
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /repo/website
COPY . /repo
COPY --from=deps /repo/website/node_modules ./node_modules
# Baked into canonical URLs, sitemap.xml and Open Graph tags at build time
ARG NEXT_PUBLIC_APP_URL=http://localhost:3000
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL \
    NEXT_OUTPUT_STANDALONE=true \
    NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- runner: minimal standalone server, non-root ----
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /repo/website/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /repo/website/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /repo/website/public ./public

USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ >/dev/null || exit 1
CMD ["node", "server.js"]
