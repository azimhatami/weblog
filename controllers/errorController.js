exports.get404 = (req, res) => {
  res.render('errors/404', {
    pageTitle: 'صفحه پیدا نشد | ۴۰۴',
    path: '/404'
  })
};

exports.get500 = (req, res) => {
  res.render('errors/500', {
    path: '/404',
    pageTitle: 'خطای سرور | 500'
  })
}
