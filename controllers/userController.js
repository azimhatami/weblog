const User = require('../models/User');

exports.login = (req, res) => {
  res.render('login', {
    pageTitle: 'ورود به بخش مدیریت',
    path: '/login'
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
    const { email } = req.body;
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

    await User.create(req.body);
    res.redirect('/users/login');
  } catch (err) {
    console.log(err);
    err.inner.forEach(e => {
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
