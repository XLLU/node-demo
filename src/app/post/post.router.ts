import express from "express";
import * as postController from "./post.controller";
import { printRequestUrl } from "../app.middleware";

const router = express.Router();

router.get("/posts", printRequestUrl, postController.index);

export default router;
 