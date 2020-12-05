import { connection } from '../app/database/mysql';
import { TagModel } from './tag.model';
/**
 * Create New Tag
 */
export const createTag = async (tag: TagModel) => {
  const statement = `
        INSERT INTO tag SET ?
    `;

  const [data] = await connection.promise().query(statement, tag);
  console.log('Data: ', data);
  return data as any;
};

/**
 * Find Tag by Name
 */
export const findTagByName = async (tagName: string) => {
  const statement = `
      SELECT * FROM tag
      WHERE name = ?
    `;

  //   const [data] = await connection.promise().query(statement, tagName);
  const [rows, fields] = await connection.promise().query(statement, tagName);

  //   console.log('Rows:', rows);
  //   console.log('Fields:', fields);

  return rows[0];
};
