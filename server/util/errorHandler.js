function HandleError(err, req, res, next) {
  if(!err.statusCode || !err.message) {
    next()
  }
  res.status(err.statusCode).send(err.message).end()
 }

  
module.exports = {
  HandleError
};
