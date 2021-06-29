const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const counterRouter = require('./routes/counter');

require('dotenv').config();

const app = express();

// -------------- DATABASE ----------------
const DATABASE_URL = process.env.DATABASE_URL
console.log(DATABASE_URL);

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Keep trying to send operations for 5 seconds
    serverSelectionTimeoutMS: 5000
}

// we are in 'top level' and can't use async/await, so
// we use old promise style .then and .catch
mongoose.connect(DATABASE_URL, mongooseOptions)
.then(() => {
  // The `mongoose.connect()` promise resolves to mongoose instance
  const mongoStore = MongoStore.create({
    // reuse mongoose connection for session storage
    client: mongoose.connection.getClient()
  });
  console.log('Connected to MongoDB');
  app.use(session({
    secret: 'asgdsadgsdagasgsag',
    resave: false,
    saveUninitialized: true,
    store: mongoStore
  }));
  app.use(cors());
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  app.use('/counter', counterRouter);
}).catch((e) => {
  console.log(e);
  // The `mongoose.connect()` promise rejects if initial connection fails
  console.log('MongoDB connection failed');
});

module.exports = app;
