const Yup = require('yup');


exports.schema = Yup.object().shape({
  title: Yup.string()
    .required('عنوان پست الزامی می باشد')
    .min(5, 'عنوان پست نباید کمتر از ۴ کاراکتر باشد')
    .max(100, 'عنوان پست نباید بیشتر از ۱۰۰ کاراکتر باشد'),
  body: Yup.string()
    .required('پست جدید باید دارای محتوا باشد'),
  status: Yup.mixed().oneOf(['private', 'public'], 'یکی از ۲ وضعیت خصوصی یا عمومی را انتخاب کنید'),
  thumbnail: Yup.object().shape({
    name: Yup.string().required('عکس بند انگشتی الزامی می باشد'),
    size: Yup.number().max(3000000, 'عکس نباید بیشتر از ۳ مگابایت باشد'),
    mimetype: Yup.mixed().oneOf(["image/jpeg", "image/png"], "تنها پسوندهای jpeg و png پشتیبانی می شوند"),
  })
});

