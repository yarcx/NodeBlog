const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
  title: {
    type: "string",
    require: true,
  },
  snippet: {
    type: "string",
    require: true,
  },
  body: {
    type: "string",
    require: true,
 }
}, { timestamps: true })

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog