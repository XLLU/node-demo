import app from "./app";
import { APP_PORT } from "./app/app.config";
import postRouter from "./app/post/post.router";


app.listen(APP_PORT, () => {
  console.log(`App is listening on port:${APP_PORT}`);
});

app.use(postRouter);