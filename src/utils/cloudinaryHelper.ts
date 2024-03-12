import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadToCloud = async (file: Express.Multer.File) => {
  try {
    const uploadedImage = await cloudinary.v2.uploader.upload(file.path, {
      folder: 'Blissmothies',
      use_filename: true,
    });
    return uploadedImage.secure_url;
  } catch (e) {
    console.error('Error uploading image to Cloudinary:', e);
    throw new Error('Error uploading image to Cloudinary');
  }
};
