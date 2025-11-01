import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { todoSchema } from "./schemas/todo";

const app = new Hono();

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
    (c) => {
      const { title, description } = c.req.valid("json");
      return c.json({ title, description });
    }
  );

export type AppType = typeof route;

export default app;
