FROM node:14-alpine AS builder1
WORKDIR /app
COPY ./annotater .
RUN npm ci

RUN npm run build

# Install dependencies only when needed
FROM node:16-alpine AS builder2
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY /interview-project .
COPY --from=builder1 /app/build ./public/annotater
RUN npm ci

ENV NEXT_TELEMETRY_DISABLED 1

# Add `ARG` instructions below if you need `NEXT_PUBLIC_` variables
# then put the value on your fly.toml
# Example:
# ARG NEXT_PUBLIC_EXAMPLE="value here"

RUN npm run build


# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder2 /app ./

USER nextjs


# If using npm comment out above and use below instead
CMD ["npm", "run", "start"]
