const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: String,
  project_description: String,
  project_link: String,
  score: Number,
  base: Number
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

module.exports = schema
