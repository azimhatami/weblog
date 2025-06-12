const Blog = require('../models/Blog');
const { formatDate } = require('../utils/jalali');
const { truncate } = require('../utils/helpers');


exports.getIndex = async (req, res) => {
  try {
    const posts = await Blog.find({ status: 'public' }).sort({ createdAt: 'desc' });

    res.render('index', {
      pageTitle: 'وبلاگ',
      path: '/',
      posts,
      formatDate,
      truncate,
    })
  } catch (err) {
    console.log(err);
    res.render('errors/500');
  }
};

exports.getSinglePost = async (req, res) => {
  try {
    const post = await Blog.findOne({ _id: req.params.id }).populate("user");

    if (!post) return res.redirect('errors/404'); 

    res.render('post', {
      pageTitle: post.title,
      path: '/post',
      post,
      formatDate
    });
  } catch (err) {
    console.log(err);
    res.render('errors/500');
  }
};
