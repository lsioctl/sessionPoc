
// session schema

// mongoose is already set up in app.js
// and available here as some kind of singleton
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  id: { type: String, default: "", maxlength: 280 },
  // not sure it is needed
  createdAt: { type: Date, default: Date.now }
 });

// Compile mode from schema and export it
module.exports = mongoose.model('sessionModel', sessionSchema);
