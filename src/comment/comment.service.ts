import { connection } from '../app/database/mysql';
import { CommentModel } from './comment.model';

/**
 * Create Comment
 */
export const createComment = async (comment: CommentModel) => {
  const statement = `
      INSERT INTO comment
      SET ?
    `;

  const [data] = await connection.promise().query(statement, comment);

  return data;
};

/**
 * Check if comment is a reply
 */
export const isReplyComment = async (commentId: number) => {
  const statement = `
        SELECT parentId FROM comment
        WHERE id = ?
    `;

  const [rows] = await connection.promise().query(statement, commentId);

  console.log(rows[0].parentId ? true : false);
  return rows[0].parentId ? true : false;
};

/**
 * Update comment
 */
export const updateComment = async (comment: CommentModel) => {
  const statement = `
        UPDATE comment
        SET content = ?
        WHERE id = ?
    `;

  const [data] = await connection
    .promise()
    .query(statement, [comment.content, comment.id]);

  return data;
};

/**
 * Delete comment
 */
export const deleteComment = async (commentId: number) => {
  const statement = `
        DELETE FROM comment
        WHERE id = ?
    `;

  const [data] = await connection.promise().query(statement, commentId);

  return data;
};
