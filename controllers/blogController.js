const Yup = require('yup');

const Blog = require('../models/Blog');
const { sendEmail } = require('../utils/mailer');


exports.getIndex = async (req, res) => {
  const page = +req.query.page || 1;
  const postPerPage = 2;

  try {
    const numberOfPosts = await Blog.find({ status: 'public' }).countDocuments();
    const posts = await Blog.find({ status: 'public' }).sort({ createdAt: 'desc' })
      .skip((page - 1) * postPerPage)
      .limit(postPerPage)

    res.render('index', {
      pageTitle: 'وبلاگ',
      path: '/',
      posts,
      formatDate,
      truncate,
      currentPage: page,
      nextPage: page + 1,
      previousPage: page - 1,
      hasNextPage: postPerPage * page < numberOfPosts,
      hasPreviousPage: page > 1,
      lastPage: Math.ceil(numberOfPosts / postPerPage),
    })
  } catch (err) {
    console.log(err);
    get500(req, res);
  }
};

exports.getSinglePost = async (req, res) => {
  try {
    const post = await Blog.findOne({ _id: req.params.id }).populate("user");

    if (!post) return res.redirect('/404'); 

    res.render('post', {
      pageTitle: post.title,
      path: '/post',
      post,
      formatDate
    });
  } catch (err) {
    console.log(err);
    get500(req, res);
  }
};

exports.handleContactPage = async (req, res) => {
  const errorArr = [];

  const {fullname, email, message} = req.body;

  const schema = Yup.object().shape({
    fullname: Yup.string()
      .required('نام و نام خانوادگی الزامی می باشد'),
    email: Yup.string().email('آدرس ایمیل صحیح نیست')
      .required('آدرس ایمیل الزامی می باشد'),
    message: Yup.string()
      .required('پیام اصلی الزامی می باشد'),
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

    req.flash('success_msg', 'پیام شما با موفقیت ارسال شد');

    res.render('contact', {
      pageTitle: 'تماس با ما',
      path: '/contact',
      message: req.flash('error'),
      errors: errorArr,
    })
    
  } catch (err) {
    err.inner.forEach((e) => {
      errorArr.push({
        name: e.path,
        message: e.message
      })
    })

    res.render('contact', {
      pageTitle: 'تماس با ما',
      path: '/contact',
      message: req.flash('error'),
      errors: errorArr,
    })
  }
};
