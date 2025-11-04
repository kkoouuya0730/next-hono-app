import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { todoSchema } from "../schemas/todosSchema";
import { todosTable } from "../db/schema";
import { db } from "../db";

export const todosRoute = new Hono()
  .post(
    "/",
    zValidator("json", todoSchema, (result, c) => {
      if (!result.success) {
        return c.json({ message: result.error.issues }, 400);
      }
    }),
    async (c) => {
      const { title, description } = c.req.valid("json");
      const todo = await db.insert(todosTable).values({ title, description }).returning();

      return c.json({ todo: todo[0] });
    }
  )
  .get("/", async (c) => {
    const todos = await db.select().from(todosTable);
    if (!todos) {
      return c.text("Failed to Fetch todos", 500);
    }
    return c.json({ todos });
  });
