const sessionService = require('./session');

async function create() {

  const sessionId = await sessionService.create();

  console.log(sessionId);
}

module.exports = {
  create
}

