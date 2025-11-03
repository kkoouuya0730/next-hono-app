import { Hono } from "hono";
import { cors } from "hono/cors";
import { zValidator } from "@hono/zod-validator";
import { todosTable } from "./db/schema";
import { todoSchema } from "./schemas/todo";
import { db } from "./db";

export type Env = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Env }>();

app.use(
  "*",
  cors({
    origin: "*",
  })
);

const route = app
  .get("/hello", (c) => {
    return c.json({ message: "Hello Hono!" });
  })
  .post(
    "/todo",
    zValidator("json", todoSchema, (result, c) => {
      if (!result.success) {
        return c.json({ message: result.error.issues[0].message }, 400);
      }
    }),
    async (c) => {
      const { title, description } = c.req.valid("json");
      const todo = await db.insert(todosTable).values({ title, description }).returning();

      return c.json({ todo: todo[0] });
    }
  )
  .get("todo", async (c) => {
    const todos = await db.select().from(todosTable);
    if (!todos) {
      return c.text("Failed to Fetch todos", 500);
    }
    return c.json({ todos });
  });

export type AppType = typeof route;

export default app;
