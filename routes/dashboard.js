const { Router } = require('express');

const router = new Router();

// @desc Login Page
// @route GET /dashboard/login
router.get('/login', (req, res) => {
  res.render('login', {
    pageTitle: 'ورود به بخش مدیریت',
    path: '/login'
  });
});

module.exports = router;
