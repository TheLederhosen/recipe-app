import { sql } from "../database/database.ts";

const addUser = async (email: string, passwordHash: string) => {
    await sql`INSERT INTO users (email, password) VALUES (${email}, ${passwordHash})`;
};

const findUserByEmail = async (email: string) => {
    const rows = await sql`SELECT * FROM users WHERE email = ${email}`;

    if (rows.length != 1) {
        return -1;
    } else {
        return rows[0];
    }
};

export { addUser, findUserByEmail }