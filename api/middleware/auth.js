const { decodeToken } = require('../lib/token')



const isLoggedIn = (req, _res, next) => {
  //check if they are sending a token and if not throw error
  if (!req.token) {
    const error = new Error(`You are not logged in.`)
    error.status = 401
    return next(error)
  }
// use the token.js lib to decode the token, if that fails throw error
  try {
    decodeToken(req.token)
    next()
  } catch (e) {
    console.error(e)
    const error = new Error(`There is a problem with your credentials.`)
    error.status = 401
    next(error)
  }
}

const isSameUser = (req, _res, next) => {
  //set id to  the userId of the request
  const id = req.params.userId
  //set payload to the decoded token
  const payload = decodeToken(req.token)
  // succeed if the userId from the decoded token is the same as the userId from the request
  if (payload.id === id) return next()
  //throw error if they don't match
  const error = new Error(`You are not authorized to access this route.`)
  error.status = 401
  next(error)
}

const isAdmin = (req, _res, next) => {
  //set payload to the decoded token
  const payload = decodeToken(req.token)
  // succeed if the userId from the decoded token is the same as the userId from the request
  if (payload.admin === true) return next()
  //throw error if they don't match
  const error = new Error(`You are not authorized to access this route.`)
  error.status = 401
  next(error)
}

module.exports = { isLoggedIn, isSameUser, isAdmin }
