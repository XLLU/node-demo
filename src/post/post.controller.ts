import { Request, Response, NextFunction } from 'express';
import * as postService from './post.service';
import _ from 'lodash';

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('Posts API: ', req.user);
  try {
    const posts = await postService.getPosts();
    res.send(posts);
  } catch (error) {
    next(error);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, content } = req.body;
    console.log(title, content);
    const data = await postService.createPost({ title, content });
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { postId } = req.params;
    const post = _.pick(req.body, ['title', 'content']);
    const data = await postService.updatePost(parseInt(postId, 10), post);
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
}; 

export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { postId } = req.params;
    const data = await postService.deletePost(parseInt(postId, 10));
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
};