import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

const fileUpload = multer({
  dest: 'uploads/',
});

/**
 * 处理单个文件的拦截器，form表单中文件字段的名称是file
 * 接口中增加这个拦截器以后，拦截器会在请求中增加file这个属性
 */
export const fileInterceptor = fileUpload.single('file');
