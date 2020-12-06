import { Request, Response, NextFunction } from 'express';
import { CommentModel } from './comment.model';
import {
  createComment,
  deleteComment,
  isReplyComment,
  updateComment,
} from './comment.service';
/**
 * New Comment
 */
export const newComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id: userId } = req.user;
  const { content, postId } = req.body;
  const comment = {
    content,
    postId,
    userId,
  };

  try {
    const data = await createComment(comment);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

/**
 * New Reply
 */
export const newReplyComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id: userId } = req.user;
  const { content, postId } = req.body;
  const { commentId } = req.params;

  const parentId = parseInt(commentId, 10);

  const comment = {
    content,
    postId,
    userId,
    parentId,
  };

  console.log(comment);
  try {
    const isReply = await isReplyComment(parentId);

    if (isReply) {
      throw new Error('CANNOT_COMMENT_ON_REPLY');
    }
  } catch (error) {
    return next(error);
  }

  try {
    const data = await createComment(comment);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

/**
 * Update Comment
 */
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const id = parseInt(commentId, 10);
  const comment = {
    id,
    content,
  };

  try {
    const data = await updateComment(comment);
    res.send(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Destroy comment
 */
export const destroyComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { commentId } = req.params;
  try {
    const data = deleteComment(parseInt(commentId, 10));
    res.send(data);
  } catch (error) {
    next(error);
  }
};
