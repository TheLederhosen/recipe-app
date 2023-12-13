import { bcrypt } from "../../deps.ts";
import * as userService from "../../services/userService.ts";
import { validasaur, Context } from "../../deps.ts";
import { UserDto } from "../../global/user-dto.ts";

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
        ctx.response.body = {message: "User created", user:userData.email}
    }
};

const viewUser = async (ctx: any) => {
    const uId = ctx.params.uId
    const user = await userService.findUserById(uId);
  
    if (user === -1) {
      ctx.response.status = 400;
      ctx.response.body = "User could not be found!";
      return;
    }
  
    const userDto: UserDto = {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email
    }
  
    ctx.response.body = userDto;
  };

export { registerUser, viewUser };