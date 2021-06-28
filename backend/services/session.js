const { v4: uuidv4 } = require('uuid');

const sessionModel = require('../models/session');

async function create(session) {
  const newSession = new sessionModel({
    id: uuidv4(),
    date: new Date(),
  });

  try {
    // Saving the Session 
    const savedSession = await newSession.save();
    return savedSession.id;
  } catch (e) {
    throw Error('Error while Creating Session: ' + e);
  }
};

module.exports = {
  create,
};

