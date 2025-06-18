import connect from "@core/db/connection";

export async function register() {
  await connect();
}
