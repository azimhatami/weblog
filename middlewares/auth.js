const jwt = require('jsonwebtoken');

exports.authenticated = (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
      const error = new Error('Token not provided');
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(' ')[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      throw error;
    }
    req.userId = decodedToken.user.userId;
    next();
  } catch (err) {
    next(err);
  }

};
