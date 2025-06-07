const bcrypt = require('bcryptjs');
const passport = require('passport'); 
const fetch = require('node-fetch');

const User = require('../models/User');

exports.login = (req, res) => {
  res.render('login', {
    pageTitle: 'ورود به بخش مدیریت',
    path: '/login',
    message: req.flash('success_msg'),
    error: req.flash('error')
  });
};

exports.handleLogin = async (req, res, next) => {
  const token = req.body['cf-turnstile-response'];

  if (!token) {
    req.flash('error', 'اعتبار سنجی captcha الزامی می باشد')
    return res.redirect('/users/login');
  }

  const secretKey = process.env.CAPTCHA_SECRET;
  const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

  try {
    const response = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
        remoteip: req.ip
      })
    });

    const json = await response.json();

    if (json.success) {
      passport.authenticate('local', {
        // successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
      })(req, res, next);
    } else {
      req.flash('error', 'مشکلی در اعتبار سنجی captcha هست');
      res.redirect('/users/login');
    }
  } catch (error) {
    console.log(error);
    req.flash('error', 'خطای سرور در بررسی captcha');
    return res.redirect('/users/login');
  }

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


exports.register = (req, res) => {
  res.render('register', {
    pageTitle: 'ثبت نام کاربر جدید',
    path: '/register'
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
    console.log(err);
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
