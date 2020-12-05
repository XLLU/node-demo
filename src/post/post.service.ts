import { connection } from '../app/database/mysql';
import { PostModel } from './post.model';

export const getPosts = async () => {
  const statement = `
    SELECT 
    post.id, post.title, post.content,
    JSON_OBJECT(
      'id', user.id,
      'name', user.name
    ) as user
    FROM post
    LEFT JOIN user 
      ON post.userid = user.id
  `;

  const [data] = await connection.promise().query(statement);

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