# dockerfile
FROM redis-viewer-base:latest AS build

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY . .

RUN npm run build

FROM redis-viewer-prod AS prod

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/public ./public
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./

RUN chown node:node -R /usr/src/app

USER node

EXPOSE 3000

CMD ["npx", "next", "start"]

