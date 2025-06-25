const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { sendEmail } = require('../utils/mailer');


exports.handleLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (isEqual) {
      const token = jwt.sign({ 
        user: {
          userId: user._id.toString(),
          email: user.email,
          fullname: user.fullname
        } 
      },
      process.env.JWT_SECRET,
      );

      res.status(200).json({ token, userId: user._id.toString() });
    } else {
      const error = new Error('Invalid credentials');
      error.statusCode = 422;
      throw error;
    }
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    await User.userValidation(req.body);
    const { fullname, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const error = new Error('User already exists');
      error.statusCode = 422;
      throw error;
    } else {
      await User.create({
        fullname,
        email,
        password
      });


      // Send Welcome Email
      sendEmail(email, fullname, 'خوش امدید به وبلاگ ما', 'خیلی خوشحالیم که به جمع ما پیوستید')

      res.status(201).json({
        message: 'User created successfully'
      });
    }

    // const hash = await bcrypt.hash(password, 10);
    // await User.create({
    //   fullname,
    //   email,
    //   password: hash
    // });

    // bcrypt.genSalt(10, (err, salt) => {
    //   if (err) throw err;
    //   bcrypt.hash(password, salt, async (err, hash) => {
    //     if (err) throw err;
    //     await User.create({
    //       fullname,
    //       email,
    //       password: hash,
    //     });
    //     res.redirect('/users/login');
    //   })
    // })
  } catch (err) {
    next(err);
  }
};

exports.handleForgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // console.log(token);
    const resetLink = `http://localhost:3000/users/reset-password/${token}`;
    // console.log(resetLink);

    sendEmail(user.email, user.fullname, 'فراموشی رمز عبور', `
        جهت تغییر رمز عبور فعلی رو لینک زیر کلیک کنید
        <a href="${resetLink}">لینک تغییر رمز عبور</a>
      `);

    res.status(200).json({
      message: 'Email sent successfully'
    });
  } catch (err) {
    next(err);
  }
};

exports.handleResetPassword = async (req, res, next) => {
  try {
    const token = req.params.token;
    const { password, confirmPassword } = req.body;

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      const error = new Error('Invalid token signature');
      error.statusCode = 401;
      throw error;
    }

    if (password !== confirmPassword) {
      const error = new Error('Password don\'n match');
      error.statusCode = 422;
      throw error;
    }

    const user = await User.findOne({ _id: decodedToken.userId  });

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    user.password = password;
    await user.save();

    res.status(200).json({
      message: 'Operation completed successfully'
    });
  } catch (err) {
    next(err);
  }
};
