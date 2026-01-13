import type { Context, Next } from "hono";
import { verifyJwt } from "../lib/verifyJwt";

export async function authMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header("Authorization");

  if (typeof authHeader === "undefined" || !authHeader.startsWith("Bearer ")) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const payload = await verifyJwt(token);

    if (!payload.sub || typeof payload.sub !== "string" || !payload.email || typeof payload.email !== "string") {
      return c.json({ message: "Invalid token" }, 401);
    }

    c.set("user", {
      userId: payload.sub,
      email: payload.email,
    });

    await next();
  } catch (error) {
    return c.json({ message: "Invalid token" }, 401);
  }
}
