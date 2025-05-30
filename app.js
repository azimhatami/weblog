const path = require('path');

const express = require('express');
const dotEnv = require('dotenv');
const morgan = require('morgan');

const connectDB = require('./config/db');
const indexRoutes = require('./routes');


// Load Config
dotEnv.config({ path: './config/config.env' })

// Database connection
connectDB();

const app = express();

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// View Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(indexRoutes);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})

