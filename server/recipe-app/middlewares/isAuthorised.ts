import { verify, Context } from "../deps.ts";
import { key } from "../global/backend-api-key.ts";
import * as userService from "../services/userService.ts";

export const authourised = async (ctx: Context, next: any) => {
    try {
        const headers: Headers = ctx.request.headers;
        const authorization = headers.get('Authorization');

        if (!authorization) {
            ctx.response.status = 401;
            ctx.response.body = "You are not authorized to access this route"
            return;
        }
        const jwt = authorization.split(' ')[1];

        if (!jwt) {
            ctx.response.status = 401;
            ctx.response.body = "You are not authorized to access this route"
            return;
        }

        const payload = await verify(jwt, key);

        if (!payload) {
            throw new Error("!payload")
        }
        
        const user = await userService.findUserByEmail(payload.email);
        ctx.state.user = user;

        await next();

    } catch (_error) {
        console.log(_error)
        ctx.response.status = 401;
        ctx.response.body = "You are not authorized to access this route"
    }
};