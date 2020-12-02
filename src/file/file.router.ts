import express from 'express';
import { authGuard } from '../auth/auth.middleware';
import * as fileController from './file.controller';
import { fileInterceptor } from './file.middleware';

const router = express.Router();

router.post('/file', authGuard, fileInterceptor, fileController.store);

router.get('/file/:fileId/serve', authGuard, fileController.serveFile);

export default router;
