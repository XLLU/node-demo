import express from 'express';
import * as postController from './post.controller';
import { requestUrl } from '../app/app.middleware';
import { runInContext } from 'vm';
import { authGuard } from '../auth/auth.middleware';
import { sort, filter } from './post.middleware';

const router = express.Router();

router.get('/posts', requestUrl, authGuard, sort, filter, postController.index);

router.post('/createPost', requestUrl, authGuard, postController.create);

router.post('/post/:postId', requestUrl, authGuard, postController.update);

router.delete('/post/:postId', requestUrl, authGuard, postController.destroy);

router.post('/post/:postId/tag', authGuard, postController.newPostTag);

router.delete('/post/:postId/tag', authGuard, postController.destroyPostTag);

export default router;
