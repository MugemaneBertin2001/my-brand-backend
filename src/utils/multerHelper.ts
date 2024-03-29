import { Request, Response, NextFunction } from 'express';
import multer, { Multer } from 'multer';
import path from 'path';

const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.tif', '.webp', '.bmp', '.tiff', '.jfif'];

const customFileFilter = (req: Request, res: Response, next: NextFunction) => {
  const file = req.file as Express.Multer.File;  

  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    return res.status(400).json({ error: 'Invalid file type. Allowed file types: PNG, JPG, JPEG, GIF, TIF, WEBP, BMP, TIFF, JFIF' });
  }

  next();
};

const fileUpload: Multer = multer({
  storage: multer.diskStorage({}),
});

export { fileUpload, customFileFilter };
