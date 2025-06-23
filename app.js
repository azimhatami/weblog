const path = require('path');

const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const dotEnv = require('dotenv');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const connectDB = require('./config/db');
const { errorHandler } = require('./middlewares/errors');


// Load Config
dotEnv.config({ path: './config/config.env' })

// Database connection
connectDB();

// Passport Configuration
require('./config/passport');

const app = express();

// BodyParser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// File Upload Middleware
app.use(fileUpload());

// Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  unset: "destroy",
  store: MongoStore.create({mongoUrl: process.env.DB_URI})
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Flash
app.use(flash());

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/blog'));
app.use('/users', require('./routes/users'));
app.use('/dashboard', require('./routes/dashboard'));

// Error Controller
app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})

