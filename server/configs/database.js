'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

const mongoPort = process.env.MONGODB_PORT || 27017;
const dbName = process.env.DB_NAME || 'old-little-cinema';
const mongoUri = process.env.MONGODB_URI || `mongodb://localhost:${mongoPort}/${dbName}`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};

// connect to the database
mongoose.connect(mongoUri, options);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`Connected to the database (${mongoUri})`);
});
