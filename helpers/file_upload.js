export const imageUpload = (req, res, next) => {
  upload.array("images", 4)(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }

    // Check for minimum of 3 files
    if (!req.files || req.files.length < 3) {
      return res.status(400).json({
        message:
          "Minimum of 3 images is required and maximum of 4 images is allowed",
      });
    }
    next();
  });
};
