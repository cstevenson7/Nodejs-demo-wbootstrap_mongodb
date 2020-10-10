// Everything in Mongoose starts with a schema. In Mongoose, each schema
// maps to a MongoDB collection and defines the shape of the documents
// within that collection.

const mongoose = require('mongoose');

//Here we are defining a type(we already have validation in place)
//and using the trim helper method to remove any whitespace frpm
//the use input.
const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
});

//Compiling a model from the Schema definition above and
// export it to use in the start.js
module.exports = mongoose.model('Registration', registrationSchema);
