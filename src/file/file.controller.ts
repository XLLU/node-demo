import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { createFile } from './file.service';
import { findFileById } from './file.service';
import _ from 'lodash';
import { pathToFileURL } from 'url';
/**
 * 文件接口处理器
 */
export const store = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id: userId } = req.user;

  // const { post: postId } = req.query;
  let postId: number;
  if (req.query && req.query.post) {
    postId = (req.query as any).post;
  }

  console.log('req.file=', req.file);
  const fileInfo = _.pick(req.file, [
    'originalname',
    'mimetype',
    'filename',
    'size',
  ]);

  try {
    const data = await createFile({
      ...fileInfo,
      userId,
      postId,
      ...req.fileMetadata,
    });
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Serve the file from API
 */
export const serveFile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { fileId } = req.params;

  try {
    const file = await findFileById(parseInt(fileId, 10));
    
    const { size } = req.query;
    let filename = file.filename;
    let root = 'uploads';
    let resizedFolder = 'resize';

    if (size) {
      const imageSizes = ['large', 'medium', 'thumbnail'];

      if (!imageSizes.some((item) => item == size)) {
        throw new Error('FILE_NOT_FOUND');
      }

      const fileExist = fs.existsSync(
        path.join(root, resizedFolder, `${filename}-${size}`),
      );

      if (fileExist) {
        filename = `${filename}-${size}`;
        root = path.join(root, resizedFolder);
      }
    }

    res.sendFile(filename, {
      root,
      headers: {
        'Content-Type': file.mimetype,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get File Metadata 
 */
export const getFileMetadata = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
  const { fileId } = req.params;

  try {
    const file = await findFileById(parseInt(fileId, 10));
    
    const data = _.pick(file, ['id', 'size', 'width', 'height', 'metadata']);

    res.send(data);

  } catch (error) {
    next(error);
  }

};