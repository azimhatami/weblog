const { Router } = require('express');

const router = new Router();


router.get('/', (req, res) => {
  res.render('index', {
    pageTitle: 'Weblog',
    layout: './layouts/loginLayout'
  });
});


module.exports = router;
