const router = require('express').Router({ mergeParams: true })
const User = require('../models/user')
const { isLoggedIn, isSameUser } = require('../middleware/auth')

//starting route http://localhost:5000/api/users/:userId/assignments

//create an assignment, middleware checks for authentication & authorization
router.post('/', isLoggedIn, isSameUser, async (req, res, next) => {
  const status = 201
  // lookup the user with the userID 
  const { userId } = req.params
  const query = { _id: userId }
  const user = await User.findOne(query)
  
  //push the json body to the assignments array creating a new assignment and save it
  user.assignments.push(req.body)
  await user.save()
  
  //respond to the request with the last assignment in the array
  const assignment = user.assignments[user.assignments.length - 1]

  res.status(status).json({ status, response: assignment })
})

//update an assignment, middleware checks for authentication & authorization
router.put('/:assignmentId', isLoggedIn, isSameUser, async (req, res, next) => {
  const status = 200

  //get userId and assignmentId from the params, use them to look up the user and the assignment
  const { assignmentId, userId } = req.params
  const query = { _id: userId }
  const user = await User.findOne(query)
  const assignment = user.assignments.id(assignmentId)

//loop through each object and update if it changed
  for (let update in req.body) {
    assignment[update] = req.body[update];
  }

  await user.save()
  
  res.status(status).json({ status, response: assignment })
})

router.delete('/:assignmentId', isLoggedIn, isSameUser, async (req, res, next) => {
  const status = 200

  const { assignmentId, userId } = req.params
  const query = { _id: userId }
  const user = await User.findOne(query)

  user.assignments = user.assignments.filter(assignment => assignment.id !== assignmentId)
  await user.save()

  res.json({ status, response: user })
})

module.exports = router
