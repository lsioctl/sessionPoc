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

  const BACKEND_ADDRESS = process.env.BACKEND_ADDRESS || 'localhost';
  const BACKEND_PORT = process.env.BACKEND_PORT || 3000;
  const backend_url = `http://${BACKEND_ADDRESS}:${BACKEND_PORT}`;
  const FRONTEND_URL = process.env.FRONTEND_URL || '*';
  const sessionSecret = process.env.SESSION_KEY;

  app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    store: mongoStore
  }));

  app.use(cors({
    // Access-Control-Allow-Origin
    // needed to fetch from a frontend
    // regexp or function can also be used
    origin: FRONTEND_URL,
    // Access-Control-Allow-Credentials
    // needed to send cookies from the frontend
    credentials: true,
  }));

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  app.use('/counter', counterRouter);

  app.listen(BACKEND_PORT, BACKEND_ADDRESS, () => {
    console.log(`Example app listening at ${backend_url}`);
  });

  
}).catch((e) => {
  console.log(e);
  // The `mongoose.connect()` promise rejects if initial connection fails
  console.log('MongoDB connection failed');
});

