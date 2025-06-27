const Yup = require('yup');


exports.schema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(5, 'عنوان پست نباید کمتر از ۴ کاراکتر باشد')
    .max(100, 'عنوان پست نباید بیشتر از ۱۰۰ کاراکتر باشد'),
  body: Yup.string()
    .required('Body is required'),
  status: Yup.mixed().oneOf(['private', 'public'], 'یکی از ۲ وضعیت خصوصی یا عمومی را انتخاب کنید'),
  thumbnail: Yup.object().shape({
    name: Yup.string().required('Thumbnail is required'),
    size: Yup.number().max(3000000, 'عکس نباید بیشتر از ۳ مگابایت باشد'),
    mimetype: Yup.mixed().oneOf(["image/jpeg", "image/png"], "تنها پسوندهای jpeg و png پشتیبانی می شوند"),
  })
});

