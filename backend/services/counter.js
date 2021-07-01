const counterModel = require('../models/counter');

async function create(sessionID) {
  const newCounter = new counterModel({
    count: 0,
    session: sessionID,
  });

  try {
    // Saving the Counter 
    const savedCounter = await newCounter.save();
    return savedCounter.count;
  } catch (e) {
    throw Error('Error while Creating Counter: ' + e);
  }
};

async function update(sessionID) {
  const counterDoc = await counterModel.findOne({
    session: sessionID
  }).exec();

  if (counterDoc) {
    const count = await increment(counterDoc);
    return count;
  } else {
    await create(sessionID);
    return 0;
  }
}

async function increment(counterDoc) {
  counterDoc.count += 1;
  await counterDoc.save();
  return counterDoc.count;
}

module.exports = {
  update,
};

