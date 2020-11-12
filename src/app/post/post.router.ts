import express from 'express';
import * as postController from './post.controller';
import { requestUrl } from '../app.middleware';
import { runInContext } from 'vm';

const router = express.Router();

router.get('/posts', requestUrl, postController.index);

router.post('/createPost', requestUrl, postController.create);

router.post('/post/:postId', requestUrl, postController.update);

router.delete('/post/:postId', requestUrl, postController.destroy);

export default router;
