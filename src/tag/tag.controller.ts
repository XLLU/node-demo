import { Request, Response, NextFunction } from 'express';
import { createTag, findTagByName } from './tag.service';

/**
 * Create New Tag
 */
export const newTag = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name } = req.body;
  console.log('Tag Name: ', name);

  try {
    // If tag exists, exist
    const tag = await findTagByName(name);

    // console.log('Found Tag: ', tag);

    if (tag) {
      throw new Error('TAG_ALREADY_EXIST');
    }
    // Else, we will create a new tag
    const data = await createTag({ name: name });
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
};
