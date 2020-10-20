function init(server) {
  server.use('/api/v1/healthcheck', require('./healthcheck'));
  server.use('/api/v1/todos', require('./todos'));
  server.use('/api/v1/users', require('./users'));
  server.use('/api/v1/email', require('./sendgrid'));
}
  
module.exports = init