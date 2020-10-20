const Guid = require('../util/getGuid');

function todoSchema(request) {
  return {
    text: request.text,
    createdAt: new Date(),
    uniqueId: Guid(),
    completed: false
  }
}


module.exports = todoSchema