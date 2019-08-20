const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const config = require('../nodemon.json')
const User = require('../api/models/user')

const reset = async () => {
  mongoose.connect(config.env.MONGO_DB_CONNECTION, { useNewUrlParser: true })

  await User.deleteMany() 
  return User.create([
    {
      email: 'student@email.com',
      password: bcrypt.hashSync('password', 10),
      first_name: 'Tester',
      last_name: 'McTestersons',
      admin: false,
      average: 80,
      assignments: [
        {
          title: 'Cupcake chocolate cake sesame snaps ice cream',
          project_description: 'Chocolate bar sugar plum bonbon fruitcake fruitcake',
          project_link: 'http://www.cupcakeipsum.com/',
          score: 80,
          base: 100
        }
      ]
    },
    {
      email: 'admin@email.com',
      password: bcrypt.hashSync('password', 10),
      first_name: 'Sir Testy',
      last_name: 'Testington',
      admin: true
    }    
  ])
}

reset().catch(console.error).then((response) => {
  console.log(`Seeds successful! ${response.length} records created.`)
  return mongoose.disconnect()
})
