const { Router } = require('express');

const router = new Router();

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
  console.log(req.body);
  res.send('weblog');
});


module.exports = router;
