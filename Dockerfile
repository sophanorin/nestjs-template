FROM node:16-alpine3.15 AS builder
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Second Stage : Setup command to run your app using lightweight node image
FROM node:16-alpine3.15
WORKDIR /app
COPY --from=builder /usr/src/app ./
EXPOSE 80
CMD ["node", "dist/app"]