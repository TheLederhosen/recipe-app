import { verify, Context } from "../deps.ts";
import { key } from "../global/backend-api-key.ts";

export const authourised = async (ctx: Context, next: any) => {
    try {
        const headers: Headers = ctx.request.headers;
        const authorization = headers.get('Authorization');

        if (!authorization) {
            ctx.response.status = 401;
            return;
        }
        const jwt = authorization.split(' ')[1];

        if (!jwt) {
            ctx.response.status = 401;
            return;
        }

        const payload = await verify(jwt, key);

        if (!payload) {
            throw new Error("!payload")
        }

        await next();

    } catch (_error) {
        ctx.response.status = 401;
        ctx.response.body = "You are not authorized to access this route"
    }
};