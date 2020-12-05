import express from 'express';
import { authGuard } from '../auth/auth.middleware';
import * as fileController from './file.controller';
import { fileInterceptor, fileProcessor } from './file.middleware';

const router = express.Router();

router.post(
  '/file',
  authGuard,
  fileInterceptor,
  fileProcessor,
  fileController.store,
);

router.get('/file/:fileId/serve', fileController.serveFile);

router.get('/file/:fileId/metadata', authGuard, fileController.getFileMetadata);

export default router;
