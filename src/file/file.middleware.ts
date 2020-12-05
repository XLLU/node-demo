import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import Jimp from 'jimp';
import { imageResizer } from './file.service';

const fileUpload = multer({
  dest: 'uploads/',
});

/**
 * 处理单个文件的拦截器，form表单中文件字段的名称是file
 * 接口中增加这个拦截器以后，拦截器会在请求中增加file这个属性
 */
export const fileInterceptor = fileUpload.single('file');

/**
 * File Processor 
 */
export const fileProcessor = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
  const { path } = req.file;
  console.log(`File: ${req.file}`, `Path: ${path}`);

  let image: Jimp;

  try {
    image = await Jimp.read(path);
  } catch (error) {
    next(error);
  }

  const { width, height } = image['bitmap'];
  
  let tags = null;
  if (image['_exif']) {
    tags = image['_exif']['tags'];
  }

  req.fileMetadata = {
    width: width,
    height: height,
    metadata: JSON.stringify(tags),
  };

  imageResizer(image, req.file);

  next();
};