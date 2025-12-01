import { Hono } from "hono";
import { cors } from "hono/cors";
import { todosRoute } from "./routes/todosRoute";
import { postsRoute } from "./routes/postsRoute";
import { commentsRoute } from "./routes/commentsRoute";
import { likesRoute } from "./routes/likesRoute";
import { followsRoute } from "./routes/followsRoute";
import { HttpError } from "./errors";

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

app.onError((err: unknown, c) => {
  if (err instanceof HttpError) {
    const payload: any = {
      success: false,
      message: err.message,
    };
    if (err.details) payload.details = err.details;

    return new Response(JSON.stringify(payload), {
      status: err.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  return c.json({ success: false, message: "Internal Server Error" }, 500);
});

const route = app
  .route("/todos", todosRoute)
  .route("/posts", postsRoute)
  .route("/comments", commentsRoute)
  .route("/likes", likesRoute)
  .route("/follows", followsRoute);

route.get("/hello", (c) => {
  return c.json({ message: "Hello Hono!" });
});

export type AppType = typeof route;

export default app;
