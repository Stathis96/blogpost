const mongoose = require('mongoose');
const Schema = mongoose.Schema; // a schema is the thing that is going to define the structure of the documents that we re gonna store inside a collection ; is the thing that a model wraps around 

const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  snippet: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
}, { timestamps: true}); //automatically generated timestamps properties for us

//the model is the thing that surrounds the schema and provides us with an interface
//by which to communicate with a db collection
const Blog = mongoose.model('Blog', blogSchema)
//first argument is important cause its gonna look at the name Blog-its gonna pluralize it -> blogs and look for that collection inside the db 

module.exports = Blog;