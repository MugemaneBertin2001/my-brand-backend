import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import express from 'express';


dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadToCloud = async (file: Express.Multer.File, res: express.Response) => {
  try {
    const profilePicture = await cloudinary.v2.uploader.upload(file.path, {
      folder: 'Blissmothies',
      use_filename: true,
    });
    return profilePicture;
  } catch (error) {
    return res.status(500).send(error);
  }
};
