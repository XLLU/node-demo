import { Request, Response, NextFunction } from 'express';
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
    console.log('filename: ', file.filename);
    res.sendFile(file.filename as string, {
      root: 'uploads',
      headers: {
        'Content-Type': file.mimetype,
      },
    });
  } catch (error) {
    next(error);
  }
};
