import express from 'express';
import * as postController from './post.controller';
import { requestUrl } from '../app.middleware';

const router = express.Router();

router.get('/posts', requestUrl, postController.index);

export default router;
