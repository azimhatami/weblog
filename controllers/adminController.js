const multer = require('multer');

const Blog = require('../models/Blog');
const { formatDate } = require('../utils/jalali');
const { get500 } = require('./errorController');
const { storage, fileFilter } = require('../utils/multer');

exports.getDashboard = async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.user.id });
    res.render('private/blogs', {
      pageTitle: 'بخش مدیریت | داشبورد',
      path: '/dashboard',
      layout: './layouts/dashLayout',
      fullname: req.user.fullname,
      blogs,
      formatDate
    });
  } catch (err) {
    console.log(err);
    get500(req, res);
  }
};

exports.getAddPost = (req, res) => {
  res.render('private/addPost', {
    pageTitle: 'بخش مدیریت | ساخت پست جدید',
    path: '/dashboard/add-post',
    layout: './layouts/dashLayout',
    fullname: req.user.fullname,
  });
};

exports.createPost = async (req, res) => {
  const errorArr = [];

  try {
    await Blog.postValidation(req.body);
    await Blog.create({ ...req.body, user: req.user.id });
    res.redirect('/dashboard');
  } catch (err) {
    console.log(err.inner);
    err.inner.forEach((e) => {
      errorArr.push({
        name: e.path,
        message: e.message
      })
    })

    return res.render('private/addPost', {
      pageTitle: 'بخش مدیریت | ساخت پست جدید',
      path: '/dashboard/add-post',
      layout: './layouts/dashLayout',
      fullname: req.user.fullname,
      errors: errorArr,
    });
  }
};

exports.uploadImage = (req, res) => {
  
  const upload = multer({
    limits: {fileSize: 4000000},
    dest: "uploads/",
    storage: storage,
    fileFilter: fileFilter
  }).single("image");

  upload(req, res, err => {
    if (err) {
      res.send(err);
    } else {
      if (req.file) {
        res.status(200).send("آپلود عکس با موفقیت انجام شد");
      } else {
        res.send('جهت آپلود عکسی انتخاب کنید');
      }
    }
  })

}
