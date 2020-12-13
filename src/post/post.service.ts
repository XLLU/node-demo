import { connection } from '../app/database/mysql';
import { PostModel } from './post.model';
import { sqlFragment } from './post.provider';

export interface getPostsOptionsPagination {
  limit?: number;
  offset?: number;
}

export interface getPostsOptionsFilter {
  name?: string;
  sql?: string;
  param?: string;
}

interface getPostsOptions {
  sort?: string;
  filter?: getPostsOptionsFilter;
  pagination?: getPostsOptionsPagination;
}

export const getPosts = async (sortOptions: getPostsOptions) => {
  const {
    sort,
    filter,
    pagination: { limit, offset },
  } = sortOptions;

  let params: Array<any> = [limit, offset];

  if (filter.param) {
    params = [filter.param, ...params];
  }

  const statement = `
    SELECT 
    post.id, post.title, post.content,
    ${sqlFragment.user},
    ${sqlFragment.totalComments},
    ${sqlFragment.files},
    ${sqlFragment.tags}
    FROM post
    ${sqlFragment.leftJoinUser}
    ${sqlFragment.leftJoinOneFile}
    ${sqlFragment.leftJoinTag}
    WHERE ${filter.sql}
    GROUP BY post.id
    ORDER BY ${sort}
    LIMIT ?
    OFFSET ?
  `;

  const [data] = await connection.promise().query(statement, params);

  return data;
};

export const createPost = async (post: PostModel) => {
  const statement = `
    INSERT INTO post
    SET ?
  `;

  const [data] = await connection.promise().query(statement, post);
  return data;
};

export const updatePost = async (postId: number, post: PostModel) => {
  const statement = `
    UPDATE post
    SET ?
    WHERE id=?
  `;

  const [data] = await connection.promise().query(statement, [post, postId]);
  return data;
};

export const deletePost = async (postId: number) => {
  const statement = `
    DELETE FROM post
    WHERE id=?
  `;

  const [data] = await connection.promise().query(statement, postId);
  return data;
};

/**
 * Create New Post Tag 
 */
export const createPostTag = async (
    postId: number, tagId: number
  ) => {
  const statement = `
    INSERT INTO post_tag (postId, tagId)
    VALUES (?,?)
  `;
  
  console.log([postId, tagId]);

  const [data] = await connection.promise().query(statement, [postId, tagId]);

  return data; 
};

/**
 * Check if post already got the tag 
 */
export const postHasTag = async (
    postId: number, tagId: number
  ) => {
    
  const statement = `
    SELECT * FROM post_tag
    WHERE postId=? AND tagId=?
  `;

  const [data] = await connection.promise().query(statement, [postId, tagId]);

  return data[0]? true: false; 
};

/**
 * Delete a post tag 
 */
export const deletePostTag = async (
    postId: number, tagId: number
  ) => {
  const statement = `
    DELETE FROM post_tag
    WHERE postId = ? and tagId = ?
  `;

  const [data] = await connection.promise().query(statement, [postId, tagId]);

  return data; 
};

/**
 * Get Post Total Count 
 */
export const getPostsTotalCount = async (
    options: getPostsOptions
  ) => {
    const { filter } = options;
    let params: Array<any> = [];

    if (filter.param) {
      params = [filter.param, ...params];
    }

    const statement = `
      SELECT COUNT(DISTINCT post.id) as totalCount
      FROM post
      ${sqlFragment.leftJoinUser}
      ${sqlFragment.leftJoinOneFile}
      ${sqlFragment.leftJoinTag}
      WHERE ${filter.sql}
    `;

    const [data] = await connection.promise().query(statement, params);

    return data[0].totalCount;
};