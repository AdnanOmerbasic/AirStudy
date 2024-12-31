import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { userTable } from "../schema/userSchema";
import { hash } from "bcryptjs";

const db = drizzle(process.env.DATABASE_URL!);

type User = {
  fullName: string;
  email: string;
  passwordHashed: string;
  isAdmin: boolean;
};

async function main() {
  const password = "admin123";
  const hashedPassword = await hash(password, 10);

  const userAdmin: User = {
    fullName: "Adnan Omerbasic",
    email: "adnan99@hotmail.com",
    passwordHashed: hashedPassword,
    isAdmin: true,
  };

  await db.insert(userTable).values(userAdmin);
}
main();
