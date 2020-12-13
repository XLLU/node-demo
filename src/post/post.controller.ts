import { Request, Response, NextFunction, request } from 'express';
import * as postService from './post.service';
import _ from 'lodash';
import { TagModel } from '../tag/tag.model';
import { findTagByName, createTag } from '../tag/tag.service';

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const posts = await postService.getPosts({
      sort: req.sort,
      filter: req.filter,
      pagination: req.pagination,
    });

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


/**
 * Create new PostTag 
 */
export const newPostTag = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
  const { postId } = req.params;
  const { name } = req.body;

  let tag: TagModel;

  try {
    tag = await findTagByName(name);
  } catch (error) {
    next(error);
  }

  console.log('Tag: ', tag);
  // If the tag master data does not exist, create it first
  if (!tag) {
    try {
      const data = await createTag({ name });
      tag = { id: data.insertId };
    } catch (error) {
      return next(error);
    }
  }


  // If the post has already got the tag
  if (tag) {
    try {
      const postHasTag = await postService.postHasTag(parseInt(postId, 10), tag.id);
      console.log('postHasTag', postHasTag);
      if (postHasTag) {
        throw new Error('POST_ALREADY_HAS_THE_TAG');
      }
    } catch (error) {
      return next(error);
    }
  }

  try {
    console.log('PostId: ', postId);
    console.log('TagId: ', tag.id);

    const data = postService.createPostTag(parseInt(postId, 10), tag.id);

    res.sendStatus(201);
  } catch (error) {
    return next(error);
  }

};

/**
 * Delete a post tag 
 */
export const destroyPostTag = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
  const { postId } = req.params;
  const { name } = req.body;

  let tag: TagModel;
  try {
    tag = await findTagByName(name);

    const postHasTag = await postService.postHasTag(parseInt(postId), tag.id);

    if (!postHasTag) {
      throw new Error('POST_HAS_NO_SUCH_TAG');
    }
    
    const data = await postService.deletePostTag(parseInt(postId), tag.id);
    res.sendStatus(200);

  } catch (error) {
    next(error);
  }
};