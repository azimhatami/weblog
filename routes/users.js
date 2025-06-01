const { Router } = require('express');
const Validator = require('fastest-validator');


const router = new Router();
const v = new Validator();

const schema = {
  fullname: {
    type: 'string',
    trim: true,
    max: 255,
    min: 4,
    messages: {
      required: 'نام و نام خانوادگی الزامی می باشد',
      stringMin: 'نام و نام خانوادگی نباید کمتر از ۴ کاراکتر باشد',
      stringMax: 'نام و نام خانوادگی نباید بیشتر از ۲۵۵ کاراکتر باشد'
    }
  },
  email: {
    type: 'email',
    normalize: true,
    messages: {
      emailEmpty: 'فیلد ایمیل نباید خالی باشد',
      required: 'ایمیل الزامی می باشد',
      string: 'آدرس ایمیل را بررسی کنید'
    }
  },
  password: {
    type: 'string',
    min: 4,
    max: 255,
    messages: {
      required: 'کلمه عبور الزامی می باشد',
      string: 'کلمه عبور را بررسی کنید',
      stringMin: 'کلمه عبور نباید کمتر از ۴ کاراکتر باشد',
      stringMax: 'کلمه عبور نمی تواند بیشتر از ۲۵۵ کاراکتر باشد'
    }
  },
  confirmPassword: {
    type: 'string',
    min: 4,
    max: 255,
    messages: {
      required: 'تکرار کلمه عبور الزامی می باشد',
      string: 'تکرار کلمه عبور را بررسی کنید',
      stringMin: 'تکرار کلمه عبور نباید کمتر از ۴ کاراکتر باشد',
      stringMax: 'تکرار کلمه عبور نمی تواند بیشتر از ۲۵۵ کاراکتر باشد'
    }
  }
};


// @desc Login Page
// @route GET /users/login
router.get('/login', (req, res) => {
  res.render('login', {
    pageTitle: 'ورود به بخش مدیریت',
    path: '/login'
  });
});

// @desc Register Page
// @route GET /users/register
router.get('/register', (req, res) => {
  res.render('register', {
    pageTitle: 'ثبت نام کاربر جدید',
    path: '/register'
  });
});

// @desc Register Handle
// @route POST /users/register
router.post('/register', (req, res) => {
  const validate = v.validate(req.body, schema);
  const errorArr = [];
  if (validate === true) {
    const {fullname, email, password, confirmPassword} = req.body;
    if (password !== confirmPassword) {
      errorArr.push({message: 'کلمه های عبور یکسان نیستند'});

      return res.render('register', {
        pageTitle: 'ثبت نام کاربر',
        path: '/register',
        errors: errorArr
      });
    }
    res.redirect('/users/login');
  } else {
    res.render('register', {
      pageTitle: 'ثبت نام کاربر',
      path: '/register',
      errors: validate,
    });
  }
});


module.exports = router;
