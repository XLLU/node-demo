import { Request, Response, NextFunction, request } from 'express';
import { POSTS_PER_PAGE } from '../app/app.config'; 

/**
 * Process sort logic
 */
export const sort = async (req: Request, res: Response, next: NextFunction) => {
  const { sort } = req.query;

  switch (sort) {
    case 'earliest':
      req.sort = 'post.id ASC';
      break;
    case 'latest':
      req.sort = 'post.id DESC';
      break;
    case 'most_comments':
      req.sort = 'totalComments DESC';
      break;
    default:
      req.sort = 'post.id DESC';
      break;
  }
  console.log(`Sort is: ${req.sort}`);
  next();
};

/**
 * Process filter logic
 */
export const filter = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { tag, user, action } = req.query;

  req.filter = {
    name: 'default',
    sql: 'post.id IS NOT NULL',
  };

  if (tag && !user && !action) {
    req.filter = {
      name: 'tagFilter',
      sql: 'tag.name = ?',
      param: tag as string,
    };
  }

  if (!tag && user && action == 'published') {
    req.filter = {
      name: 'userFilter',
      sql: 'user.id = ?',
      param: user as string,
    };
  }

  next();
};

/**
 * Pagination 
 */
export const paginate = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { page = 1 } = req.query;

    const limit = parseInt(POSTS_PER_PAGE, 10) || 10; 
    
    const offset = limit * (parseInt(page as string, 10) -1)

    req.pagination = {limit, offset};

    next();
};