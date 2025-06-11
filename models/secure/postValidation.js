const Yup = require('yup');


exports.schema = Yup.object().shape({
  title: Yup.string()
    .required('عنوان پست الزامی می باشد')
    .min(5, 'عنوان پست نباید کمتر از ۴ کاراکتر باشد')
    .max(100, 'عنوان پست نباید بیشتر از ۱۰۰ کاراکتر باشد'),
  body: Yup.string()
    .required('پست جدید باید دارای محتوا باشد'),
  status: Yup.mixed().oneOf(['private', 'public'], 'یکی از ۲ وضعیت خصوصی یا عمومی را انتخاب کنید'),
});

