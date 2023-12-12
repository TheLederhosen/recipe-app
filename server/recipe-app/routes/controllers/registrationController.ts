import { bcrypt } from "../../deps.ts";
import * as userService from "../../services/userService.ts";
import { validasaur, Context } from "../../deps.ts";

const userValidationRules = {
    email: [validasaur.required, validasaur.isEmail],
    password: [validasaur.required, validasaur.minLength(4)],
};

const getUserData = async (ctx: Context) => {
    const body = ctx.request.body({ type: "json" });
    const jsonBody = await body.value;
    return {
        email: jsonBody.email,
        password: jsonBody.password
    };
};

const registerUser = async (ctx: Context) => {
    const userData = await getUserData(ctx);

    if (await userService.findUserByEmail(userData.email) !== -1) {
        ctx.response.status = 400;
        ctx.response.body = "Email is already taken!";
        return;
    }

    const [passes, errors] = await validasaur.validate(
        userData,
        userValidationRules,
    );

    if (!passes) {
        ctx.response.status = 400; // Bad Request
        ctx.response.body = errors;
        return;
    } else {
        const hashedPassword = await bcrypt.hash(userData.password);
        await userService.addUser(
            userData.email,
            hashedPassword,
        );

        ctx.response.status = 201;
        ctx.response.body = "User created";
    }
};

export { registerUser };