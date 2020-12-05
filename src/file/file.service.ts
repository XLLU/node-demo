import { connection } from '../app/database/mysql';
import { FileModel } from './file.model';
import path from 'path';
import Jimp from 'jimp';
import { Multer } from 'multer';
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

/**
 * Image Resizer 
 */
export const imageResizer = async (
    image: Jimp, file: Express.Multer.File
  ) => {
  const { width, height } = image['bitmap'];
  
  const filePath = path.join(file.destination, 'resize', file.filename);

  if (width > 1280) {
    image.resize(1280, Jimp.AUTO)
      .quality(85)
      .write(`${filePath}-large`);
  }

  if (width > 640) {
    image.resize(640, Jimp.AUTO)
      .quality(85)
      .write(`${filePath}-medium`);
  }

  if (width > 320) {
    image.resize(320, Jimp.AUTO)
      .quality(85)
      .write(`${filePath}-thumbnail`);
  }
};