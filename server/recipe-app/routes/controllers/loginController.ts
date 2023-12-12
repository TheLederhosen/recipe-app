import { bcrypt, create } from "../../deps.ts";
import * as userService from "../../services/userService.ts";
import { Context } from "../../deps.ts";
import { key } from "../../global/backend-api-key.ts";

const getUserData = async (ctx: Context) => {
    const body = ctx.request.body({ type: "json" });
    const jsonBody = await body.value;
    return {
        email: jsonBody.email,
        password: jsonBody.password
    };
};

export const loginUser = async (ctx: Context) => {
    const userData = await getUserData(ctx);

    const user = await userService.findUserByEmail(userData.email);

    if (user === -1) {
        ctx.response.status = 404;
        ctx.response.body = `user "${userData.email}" not found`;
        return;
    }

    const confirmPassword = await bcrypt.compare(userData.password, user.password);

    if (!confirmPassword) {
        ctx.response.status = 404;
        ctx.response.body = "Incorrect password";
        return;
    }

    //authenticate a user
    const payload = {
        id: user.id,
        email: user.password
    };
    
    const jwt = await create({ alg: "HS512", typ: "JWT" }, { payload }, key);

    if (jwt) {
        ctx.response.status = 200;
        ctx.response.body = {
            userId: user.id,
            email: user.email,
            token: jwt,
        }
    } else {
        ctx.response.status = 500;
        ctx.response.body = "Internal server error";
    }
}