function userSchema(request) {
  const user = {
    firstName: request.firstName,
    lastName: request.lastName,
    email: request.email,
    password: request.password,
    todos: []
  }
  return user
}

module.exports = userSchema