const Yup = require('yup');

const Blog = require('../models/Blog');
const { sendEmail } = require('../utils/mailer');


exports.getIndex = async (req, res) => {
  try {
    const numberOfPosts = await Blog.find({ status: 'public' }).countDocuments();
    const posts = await Blog.find({ status: 'public' }).sort({ createdAt: 'desc' })

    res.status(200).json({
      posts,
      total: numberOfPosts,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err
    });
  }
};

exports.getSinglePost = async (req, res) => {
  try {
    const post = await Blog.findOne({ _id: req.params.id }).populate("user");

    if (!post) return res.status(404).json({
      message: 'Not Found'
    }); 

    res.status(200).json({
      post
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err
    });
  }
};

exports.handleContactPage = async (req, res) => {
  let errorArr = [];

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
    err.inner.forEach((e) => {
      errorArr.push({
        name: e.path,
        message: e.message
      })
    });

    res.status(422).json({
      error: errorArr
    });
  }
};
