import express from "express";
import * as postController from "./post.controller";

const router = express.Router();

router.get("/post", postController.index);

export default router;
