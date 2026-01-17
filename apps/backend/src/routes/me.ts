import { Hono } from "hono";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { authMiddleware } from "../middlewares/auth";

type AuthUser = {
  userId: string; // cognito sub
  email: string;
};

export const meRoute = new Hono();

meRoute.get("/", authMiddleware, async (c) => {
  const authUser = c.get("user") as AuthUser;

  const cognitoSub = authUser.userId;
  const email = authUser.email;

  const existingUser = await db.select({ users }).from(users).where(eq(users.cognitoSub, cognitoSub));

  if (existingUser[0]) return c.json(existingUser[0]);

  const [createdUser] = await db
    .insert(users)
    .values({ cognitoSub, email, username: email.split("@")[0] })
    .returning();

  return c.json(createdUser, 201);
});
