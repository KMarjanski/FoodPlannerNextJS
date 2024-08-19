import connect from "./app/lib/bd";

export async function register() {
  await connect();
}
