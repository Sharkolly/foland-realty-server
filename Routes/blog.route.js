import express from 'express';
import { getAllBlogs } from '../Controller/blog.controller.js';

const router = express.Router();

router.get('/', getAllBlogs);

export default router;