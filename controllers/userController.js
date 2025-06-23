const bcrypt = require('bcryptjs');
const passport = require('passport'); 
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { sendEmail } = require('../utils/mailer');


exports.handleLogin = async (req, res, next) => {
  passport.authenticate('local', {
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
};

exports.rememberMe = (req, res) => {
  if (req.body.remember) {
    req.session.cookie.originalMaxAge = 24 * 60 * 60 * 1000 // 1 day
  } else {
    req.session.cookie.expire = null;
  }

  res.redirect('/dashboard');
};

exports.logout = (req, res, next) => {
  req.logout(function(err) {
    if (err) throw err;
    req.session = null;
    // req.flash('success_msg', 'خروج موفقیت‌آمیز بود');
    res.redirect('/users/login');
  });
};

exports.createUser = async (req, res) => {
  const errors = [];
  try {
    await User.userValidation(req.body);
    const { fullname, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      errors.push({
        message: 'کاربری با این ایمیل موجود است'
      });
      return res.render('register', {
        pageTitle: 'ثبت نام کاربر',
        path: '/register',
        errors,
      })
    };

    // const hash = await bcrypt.hash(password, 10);
    // await User.create({
    //   fullname,
    //   email,
    //   password: hash
    // });
    await User.create({
      fullname,
      email,
      password
    });


    // Send Welcome Email
    sendEmail(email, fullname, 'خوش امدید به وبلاگ ما', 'خیلی خوشحالیم که به جمع ما پیوستید')

    req.flash("success_msg", "ثبت نام موفقیت امیز بود");
    res.redirect('/users/login');

//    bcrypt.genSalt(10, (err, salt) => {
//      if (err) throw err;
//      bcrypt.hash(password, salt, async (err, hash) => {
//        if (err) throw err;
//        await User.create({
//          fullname,
//          email,
//          password: hash,
//        });
//        res.redirect('/users/login');
//      })
//    })

  } catch (err) {
    err.inner.forEach((e) => {
      errors.push({
        name: e.path,
        message: e.message
      })
    })

    return res.render('register', {
      pageTitle: 'ثبت نام کاربر',
      path: '/register',
      errors,
    })
  }
};

exports.handleForgetPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    req.flash('error', 'کاربری با این ایمیل در پایگاه داده ثبت نیست');

    return res.render('forgetPass', {
      pageTitle: 'فراموشی رمز عبور',
      path: '/login',
      message: req.flash('success_msg'),
      error: req.flash('error'),
    })
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const resetLink = `http://localhost:3000/users/reset-password/${token}`;

  sendEmail(user.email, user.fullname, 'فراموشی رمز عبور', `
      جهت تغییر رمز عبور فعلی رو لینک زیر کلیک کنید
      <a href="${resetLink}">لینک تغییر رمز عبور</a>
    `);

  req.flash('success_msg', 'ایمیل حاوی لینک با موفقیت ارسال شد')

  res.render('forgetPass', {
    pageTitle: 'فراموشی رمز عبور',
    path: '/login',
    message: req.flash('success_msg'),
    error: req.flash('error'),
  })

};

exports.resetPassword = async (req, res) => {
  const token = req.params.token;

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (!decodedToken) {
      return res.redirect('/404');
    }
  }

  res.render('resetPass', {
    pageTitle: 'تغییر پسورد',
    path: '/login',
    message: req.flash('success_msg'),
    error: req.flash('error'),
    userId: decodedToken.userId
  })
};

exports.handleResetPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    req.flash('error', 'کلمه های عبور یکسان نیستند');

    return res.render('resetPass', {
      pageTitle: 'تغییر پسورد',
      path: '/login',
      message: req.flash('success_msg'),
      error: req.flash('error'),
      userId: req.params.id,
    })
  }

  const user = await User.findOne({ _id: req.params.id });

  if (!user) {
    return res.redirect('/404');
  }

  user.password = password;
  await user.save();

  req.flash('success_msg', 'پسورد شما با موفقیت بروزرسانی شد');
  res.redirect('/users/login');
};
