const Yup = require('yup');


exports.schema = Yup.object().shape({
  fullname: Yup.string()
    .required('نام و نام خانوادگی الزامی می باشد')
    .min(4, 'نام و نام خانوادگی نباید کمتر از ۴ کاراکتر باشد')
    .max(255, 'نام و نام خانوادگی نباید بیشتر از۲۵۵ کاراکتر باشد'),
  email: Yup.string()
    .email('ایمیل معتبر نمی باشد')
    .required('ایمیل الزامی می باشد'),
  password: Yup.string()
    .min(4, 'کلمه عبور نباید کمتر از ۴ کاراکتر باشد')
    .max(255, 'کلمه عبور نباید بیشتر از ۲۵۵ کاراکتر باشد')
    .required('کلمه عبور الزامی است'),
  confirmPassword: Yup.string()
    .required('تکرار کلمه عبور الزامی می باشد')
    .oneOf([Yup.ref('password'), null]),
});

