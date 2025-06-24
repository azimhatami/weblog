const Yup = require('yup');

const Blog = require('../models/Blog');
const { sendEmail } = require('../utils/mailer');


exports.getIndex = async (req, res, next) => {
  try {
    const numberOfPosts = await Blog.find({ status: 'public' }).countDocuments();
    const posts = await Blog.find({ status: 'public' }).sort({ createdAt: 'desc' })

    if (!posts) {
      const error = new Error('There are no posts recorded in the database');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      posts,
      total: numberOfPosts,
    });
  } catch (err) {
    next(err);
  }
};

exports.getSinglePost = async (req, res, next) => {
  try {
    const post = await Blog.findOne({ _id: req.params.id }).populate("user");

    if (!post) {
      const error = new Error('Post not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      post
    });
  } catch (err) {
    next(err);
  }
};

exports.handleContactPage = async (req, res, next) => {
  const {fullname, email, message} = req.body;

  const schema = Yup.object().shape({
    fullname: Yup.string()
      .required('Full name is required'),
    email: Yup.string().email('Invalid email address')
      .required('Email is required'),
    message: Yup.string()
      .required('Message is required'),
  });

  try {
    await schema.validate(req.body, {abortEarly: false});

    // TODO Captcha Validation

    sendEmail(
      email, 
      fullname, 
      'پیام از طرف وبلاگ', 
      `${message} <br/> ایمیل کاربر: ${email}`
    );

    res.status(200).json({
      message: 'Your message has been sent successfully'
    });
    
  } catch (err) {
    next(err);
  }
};
