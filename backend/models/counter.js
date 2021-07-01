
// counter schema

// mongoose is already set up in app.js
// and available here as some kind of singleton
const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0
  },
  // maybe a better way to use session from express-session store
  session: {
    type: String
  },
}, {
  // let mongoose schema handle createdAt and updatedAt
  timestamps: true
});

// Compile mode from schema and export it
module.exports = mongoose.model('counterModel', counterSchema);
