const router = require('express').Router()


router.get('/', async (req, res, next) => {
  try {
    const result = {
        statusCode: 200,
        data: "Ok"
    }
    res.status(200).send(result)
  } catch (err) {
    next(new httpError.InternalServerError(err.message || err));
  }
});

module.exports = router  