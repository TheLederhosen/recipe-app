import { postgres } from "../deps.ts";

let sql: any;
const db_env = Deno.env.get("DATABASE_URL")

if (db_env != undefined) {
  sql = postgres(db_env);
} else {
  sql = postgres({});
}

export { sql };
