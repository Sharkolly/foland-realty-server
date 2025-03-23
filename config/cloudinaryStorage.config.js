// config/cloudinaryStorage.js
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.config.js';




const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'foland-realty', // Name of folder in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

export default storage;
