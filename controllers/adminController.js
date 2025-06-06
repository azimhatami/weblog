exports.getDashboard = async (req, res) => {
  res.render('private/blogs', {
    pageTitle: 'بخش مدیریت | داشبورد',
    path: '/dashboard',
    layout: './layouts/dashLayout',
    fullname: req.user.fullname,
  });
};
