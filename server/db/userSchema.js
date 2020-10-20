const Guid = require('../util/getGuid');

function userSchema(request) {
  const user = {
    firstName: request.firstName,
    lastName: request.lastName,
    email: request.email,
    password: request.password,
    uniqueId: Guid(),
    verified: false,
    todos: [
      {
        text: "The first one is on us, we started by checking off the task of making a todo list",
        createdAt: new Date(),
        uniqueId: Guid(),
        checked: true
      }
    ]
  }
  return user
}

module.exports = userSchema