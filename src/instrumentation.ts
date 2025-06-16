import connect from "@shared/db";

export async function register() {
  await connect();
}
