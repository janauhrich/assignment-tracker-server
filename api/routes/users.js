const router = require('express').Router()
const User = require('../models/user')
const { isLoggedIn, isSameUser, isAdmin } = require('../middleware/auth')
const { validate } = require('../middleware/users')

const excludeKeys = '-__v -password'

//starting route http://localhost:5000/api/users/



router.get('/', isLoggedIn, async (req, res, next) => {
  const status = 200
  const query = req.query;
  let response = await User.find(query).select(excludeKeys)

  res.json({ status, response })

})

// wanted to experiment with an endpoint for ungraded/graded assignments
// I didn't end up using the ungraded/graded but i did get the unwinded assignments to work
//http://localhost:5000/api/users/assignments?ungraded
//http://localhost:5000/api/users/assignments?graded
router.get('/assignments', isLoggedIn, isAdmin, async (req, res, next) => {
  const status = 200
  const query = req.query;

  // get all users who have assignments and return each assignment as it's own result
  const usersWithAssignments = await User.aggregate([{ $unwind: "$assignments" }])
  let response = usersWithAssignments;

  if (String(Object.keys(query)).includes(`graded`)) {
    const assignmentsWithGrades = usersWithAssignments.filter(student => student.assignments.score)
    response = assignmentsWithGrades
  }

  if (String(Object.keys(query)).includes(`ungraded`)) {
    const assignmentsWithNoGrades = usersWithAssignments.filter(student => !student.assignments.score)
    response = assignmentsWithNoGrades
  }


  res.json({ status, response })

})


router.get('/:userId', isLoggedIn, async (req, res, next) => {
  const status = 200
  const response = await User.findById(req.params.userId).select(excludeKeys)
  res.json({ status, response })
})

router.put('/:userId', isLoggedIn, isSameUser, validate, async (req, res, next) => {
  const status = 200
  const query = { _id: req.params.userId }
  const options = { new: true }
  const response = await User.findOneAndUpdate(query, req.body, options).select(excludeKeys)

  res.json({ status, response })
})

router.delete('/:userId', isLoggedIn, isSameUser, async (req, res, next) => {
  const status = 200

  const query = { _id: req.params.userId }
  const response = await User.findOneAndDelete(query, req.body).select(excludeKeys)

  res.json({ status, response })
})

module.exports = router
