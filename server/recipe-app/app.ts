import { Application, send, oakCors } from "./deps.ts";
import { errorMiddleware } from "./middlewares/errorMiddleware.ts";
import { serveStaticMiddleware } from "./middlewares/serveStaticMiddleware.ts";
import { router } from "./routes/routes.ts";

const app = new Application();

app.use(errorMiddleware);
app.use(serveStaticMiddleware);
app.use(oakCors());
app.use(router.routes());

app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/static`,
    index: "index.html",
  });
});

export { app };
