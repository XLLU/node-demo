import express from 'express';
import * as postController from './post.controller';
import { requestUrl } from '../app/app.middleware';
import { runInContext } from 'vm';
import { authGuard } from '../auth/auth.middleware';

const router = express.Router();

router.get('/posts', requestUrl, authGuard, postController.index);

router.post('/createPost', requestUrl, authGuard, postController.create);

router.post('/post/:postId', requestUrl, authGuard, postController.update);

router.delete('/post/:postId', requestUrl, authGuard, postController.destroy);

export default router;
