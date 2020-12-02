import { connection } from '../app/database/mysql';
import { FileModel } from './file.model';

/**
 * Store the file info
 */
export const createFile = async (file: FileModel) => {
  const statement = `
        INSERT INTO file
        SET ?
    `;

  const [data] = await connection.promise().query(statement, file);

  return data;
};

/**
 * Serve the file from API
 */
export const findFileById = async (fileId: number) => {
  const statement = `
        SELECT * FROM file
        WHERE id=?
    `;

  const [data] = await connection.promise().query(statement, fileId);

  return data[0];
};
