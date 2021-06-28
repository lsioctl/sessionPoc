
// Session schema

/**
 * Could use mongodb _id instead, but I don't like exposing
 * such private informations, and it could lead to other
 * issues when scaling (like how id is unique)
 **/

// mongoose is already set up in app.js
// and available here as some kind of singleton
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  id: { type: String, default: "", maxlength: 280 },
  // not sur it is needed
  createdAt: { type: Date, default: Date.now }
 });

// Compile mode from schema and export it
module.exports = mongoose.model('sessionModel', sessionSchema);
