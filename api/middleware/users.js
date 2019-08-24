const User = require('../models/user')

// when creating a new user run schema validation and return an error if that fails
const validate = async (req, _res, next) => {
  try {
    const user = new User(req.body)
    await user.validateSync()
    next()
  } catch (e) {
    e.status = 422
    next(e)
  }
}

module.exports = { validate }
