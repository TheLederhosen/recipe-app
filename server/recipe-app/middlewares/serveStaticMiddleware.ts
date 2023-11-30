import { Context, send } from "../deps.ts";

const serveStaticMiddleware = async (ctx: Context, next: () => any) => {
  if (ctx.request.url.pathname.startsWith("/static")) {
    const path = ctx.request.url.pathname.substring(7);

    await send(ctx, path, {
      root: `${Deno.cwd()}/static`,
    });
  } else {
    await next();
  }
};

export { serveStaticMiddleware };
