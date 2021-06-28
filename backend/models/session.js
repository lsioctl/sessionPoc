
// Session schema

/**
 * Could use mongodb _id instead, but I don't like exposing
 * such private informations, and it could lead to other
 * issues when scaling (like how id is unique)
 **/

 const db = require('../helper/db');
 const mongoose = db.get();
 const postSchema = new mongoose.Schema({
     id: { type: String, default: "", trim: true, maxlength: 280 },
     // not sur it is needed
     createdAt: { type: Date, default: Date.now }
 });
 
 module.exports = mongoose.model('Post', postSchema);