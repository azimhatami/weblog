const { Router } = require('express');
const Yup = require('yup');


const router = new Router();

const schema = Yup.object().shape({
  fullname: Yup.string().required('نام و نام خانوادگی الزامی می باشد').min(4, "نام و نام خانوادگی نباید کمتر از ۴کاراکتر باشد").max(255, "نام و نام خانوادگی نباید بیشتر از ۲۵۵ کاراکتر باشد"),
  email: Yup.string().email('ایمیل معتبر نمی باشد').required('ایمیل الزامی می باشد'),
  password: Yup.string().min(4, "کلمه عبور نباید کمتر از ۴ کارکتر باشد").max(255, "کلمه عبور نباید بیشتر از ۲۵۵ کاراکتر باشد").required("کلمه عبور الزامی می باشد"),
  confirmPassword: Yup.string().required("تکرار کلمه عبور الزامی می باشد").oneOf([Yup.ref('password'), null])
});

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
  schema.validate(req.body).then((result) => {
    res.redirect('/users/login');
  }).catch((err) => {
    console.log(err);
    console.log(err.errors);
    res.render('register', {
      pageTitle: 'ثبت نام کاربر', 
      path: '/register', 
      errors: err.errors
    });
  })
});


module.exports = router;
