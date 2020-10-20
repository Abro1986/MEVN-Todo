function HandleError(err, req, res, next) {
  res.status(err.statusCode || 500).send(err.message).end()
 }

  
module.exports = {
  HandleError
};
