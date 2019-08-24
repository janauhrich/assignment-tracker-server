
//for every request (via app.use) add a property of token to the request that is equal to the header authorization token
module.exports = (req, _res, next) => {
  try {
    req.token = req.headers.authorization.split('Bearer ')[1]
    next()
  } catch (_e) {
    req.token = null
    next()
  }
}
