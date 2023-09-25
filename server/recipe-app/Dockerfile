FROM denoland/deno:alpine-1.29.2

EXPOSE 7777

WORKDIR /app

COPY deps.ts .

RUN deno cache deps.ts

COPY . .

CMD [ "run", "--unstable", "--watch", "--allow-net", "--allow-read", "--allow-env", "--no-check", "app-launch.ts" ]