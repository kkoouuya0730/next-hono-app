import { Hono } from "hono";
import { cors } from "hono/cors";
import { postsRoute } from "./routes/post.route";
import { commentsRoute } from "./routes/commentsRoute";
import { likesRoute } from "./routes/likesRoute";
import { followsRoute } from "./routes/followsRoute";
import { meRoute } from "./routes/me";
import { errorHandler } from "./error-handler";

export type Env = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Env }>();

app.use(
  "*",
  cors({
    origin: "*",
  }),
);

app.onError(errorHandler);

const route = app
  .route("/posts", postsRoute)
  .route("/comments", commentsRoute)
  .route("/likes", likesRoute)
  .route("/follows", followsRoute)
  .route("/me", meRoute);

route.get("/hello", (c) => {
  return c.json({ message: "Hello Hono!" });
});

export type AppType = typeof route;

export default app;
