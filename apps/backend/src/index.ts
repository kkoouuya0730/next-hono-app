import { Hono } from "hono";
import { cors } from "hono/cors";
import { todosRoute } from "./routes/todosRoute";
import { postsRoute } from "./routes/postsRoute";
import { commentsRoute } from "./routes/commentsRoute";
import { likesRoute } from "./routes/likesRoute";

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
  .route("/todos", todosRoute)
  .route("/posts", postsRoute)
  .route("/comments", commentsRoute)
  .route("/likes", likesRoute);

route.get("/hello", (c) => {
  return c.json({ message: "Hello Hono!" });
});

export type AppType = typeof route;

export default app;
