import { sql } from "../database/database.ts";

const addUser = async (firstName: string, lastName: string, email: string, passwordHash: string) => {
    await sql`INSERT INTO users (first_name, last_name, email, password) VALUES (${firstName}, ${lastName}, ${email}, ${passwordHash})`;
};

const findUserByEmail = async (email: string) => {
    const rows = await sql`SELECT * FROM users WHERE email = ${email}`;

    if (rows.length != 1) {
        return -1;
    } else {
        return rows[0];
    }
};

const findUserById = async (userId: number) => {
    const rows = await sql`SELECT * FROM users WHERE id = ${userId}`;

    if (rows.length != 1) {
        return -1;
    } else {
        return rows[0];
    }
};

export { addUser, findUserByEmail, findUserById }