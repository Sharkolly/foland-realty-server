// config/cloudinaryStorage.js
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.config.js';

// configure cloudinary store
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'foland-realty', // Name of folder in Cloudinary
    resource_type: 'auto',
    allowed_formats: ['jpg', 'jpeg', 'png', 'avi', 'mov', 'mp4', 'webm', 'webp'],
  },
});

export default storage;
