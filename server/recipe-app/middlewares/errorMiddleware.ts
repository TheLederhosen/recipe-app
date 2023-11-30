import { Context } from "../deps.ts";

const errorMiddleware = async (ctx: Context, next: () => any) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
  }
};

export { errorMiddleware };
