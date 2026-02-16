import { blogs } from "../data/blog.js";

export const getAllBlogs = (req, res, next) => {
  try {
    return res.status(201).json({
      status: true,
      message: "sucessful",
      data: blogs,
    });
  } catch (err) {
    next(err);
  }
};
