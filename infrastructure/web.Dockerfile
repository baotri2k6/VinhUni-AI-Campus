FROM node:24-bookworm-slim
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package*.json ./
COPY apps/web/package.json apps/web/package.json
COPY packages/glass-ui/package.json packages/glass-ui/package.json
RUN npm ci
COPY apps/web apps/web
COPY packages/glass-ui packages/glass-ui
RUN npm run build && npm prune --omit=dev && chown -R node:node /app/apps/web/.next
USER node
EXPOSE 3000
CMD ["npm", "run", "start"]
