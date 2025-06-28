const fs = require('fs');
const path = require('path');

const multer = require('multer');
const sharp = require('sharp');
const shortId = require('shortid');
const appRoot = require('app-root-path');

const Blog = require('../models/Blog');
const { storage, fileFilter } = require('../utils/multer');


exports.editPost = async (req, res, next) => {
  const thumbnail = req.files ? req.files.thumbnail : {};
  const fileName = `${shortId.generate()}_${thumbnail.name}`;
  const uploadPath = `${appRoot}/public/uploads/thumbnails/${fileName}`;

  const post = await Blog.findOne({ _id: req.params.id });

  try {
    if (thumbnail.name) {
      await Blog.postValidation({...req.body, thumbnail});
    } else {
      await Blog.postValidation({
        ...req.body, 
        thumbnail: {
          name: 'placeholder', 
          size: 0, 
          mimetype: 'image/jpeg'
        }});
    }

    if (!post) {
      const error = new Error('Post not found');
      error.statusCode = 404;
      throw error;
    }

    if (post.user.toString() != req.userId) {
      const error = new Error('Edit permission denied');
      error.statusCode = 401;
      throw error;
    } else {
      if (thumbnail.name) {
        fs.unlink(`${appRoot}/public/uploads/thumbnails/${post.thumbnail}`, async (err) => {
          if (err) {
            console.log(err);
          } else {
            await sharp(thumbnail.data)
              .jpeg({quality: 60})
              .toFile(uploadPath)
              .catch(err => console.log(err))
          }
        });
      }
      
      const { title, status, body } = req.body;
      post.title = title;
      post.status = status;
      post.body = body;
      post.thumbnail =  thumbnail.name ? fileName : post.thumbnail;
      
      await post.save();
      
      res.status(200).json({
        message: 'Post edited successfully'
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Blog.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const filePath = `${appRoot}/public/uploads/thumbnails/${post.thumbnail}`;

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting post image:', err);
        return res.status(400).json({ message: 'Error deleting post image' });
        // یا: return next(err);
      }

      return res.status(200).json({
        message: 'Post deleted successfully',
      });
    });

  } catch (err) {
    console.log(err);
    next(err);
  }
};


exports.createPost = async (req, res, next) => {
    const thumbnail = req.files ? req.files.thumbnail : {};
    const fileName = `${shortId.generate()}_${thumbnail.name}`;
    const uploadPath = `${appRoot}/public/uploads/thumbnails/${fileName}`;

    try {
        req.body = { ...req.body, thumbnail };

        await Blog.postValidation(req.body);

        await sharp(thumbnail.data)
            .jpeg({ quality: 60 })
            .toFile(uploadPath)
            .catch((err) => console.log(err));

        await Blog.create({
            ...req.body,
            user: req.userId,
            thumbnail: fileName,
        });

        res.status(201).json({ message: "پست جدید با موفقیت ساخته شد" });
    } catch (err) {
        next(err);
    }
};

exports.uploadImage = async (req, res) => {
    const upload = multer({
        limits: { fileSize: 4000000 },
        fileFilter: fileFilter
    }).single("image");

    upload(req, res, async (err) => {
        if (err) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(422).json({
                    error: "حجم عکس ارسالی نباید بیشتر از 4 مگابایت باشد"
                });
            }
            return res.status(400).json({ error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({
                error: "جهت آپلود باید عکسی انتخاب کنید"
            });
        }

        try {
            const fileName = `${shortId.generate()}_${req.file.originalname}`;
            await sharp(req.file.buffer)
                .jpeg({ quality: 60 })
                .toFile(`./public/uploads/${fileName}`);
            
            res.status(200).json({
                image: `http://localhost:3000/uploads/${fileName}`
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "خطا در پردازش تصویر"
            });
        }
    });
};
