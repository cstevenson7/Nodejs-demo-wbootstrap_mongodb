//importing Express into the routes file and grabbing the router 
//from it
const express = require('express');

//to save user data to db need to require Mongoose and import our model
const mongoose = require('mongoose');

//using http-auth  and path to lock down the list of successful registrations from prying eyes.
const path = require('path');
const auth = require('http-auth');


//Next, let it know where to find the file in which we’ll list the users
// and passwords (in this case, users.htpasswd in the project root)
const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd'),
});

//need to require the validator
const { check, validationResult} = require ('express-validator');

//now using the router to respond to any requests to the
//root URL() which is http://localhost:3000 in this case) and
//write the it works message
 const router = express.Router();
// router.get('/', (req,res) =>{
//     res.send('It works!');
// });


const Registration = mongoose.model('Registration');

// The callback function is executed whenever somebody visits a URL that matches
// the route it specifies. The callback receives a req and res parameter,
// where req is an object full of information that’s coming in (such as form
// data or query parameters) and res is an object full of methods for sending
// data back to the user. There’s also an optional next parameter, which is
// useful if you don’t actually want to send any data back, or if you want
// to pass the request off for something else to handle.

//Telling our route to now use the new PUG template
//and dynmically pass the title (Registration form now shows up on the page tab)
// for the templates
router.get('/', (req,res) =>{
    res.render('form', {title: 'Registration form'});
});

//A final route, which lists out all of our registrations.
//This means that we’ll also need a corresponding view
// template (views/index.pug)
 //Here, we’re using Mongo’s Collection#find method, which, if invoked without parameters,
// will return all of the records in the collection. Because the database lookup is 
// asynchronous, we’re waiting for it to complete before rendering the view. If any
// records were returned, these will be passed to the view template in the registrations
// property. If no records were returned, registrations will be an empty array.
//add the http-auth to the route you wish to protect, in this case
//it is the registrations route

router.get('/registrations', basic.check((req,res) => {
  Registration.find()
    .then((registrations) => {    
    res.render('index', { title: 'Listing registrations', registrations });
    })
    .catch(() => { res.send('Sorry! Something went wrong.');});
}));

//logging the submitted data to the terminal. 
// router.post('/', (req, res) => {
//   console.log(req.body);
//   res.render('form', { title: 'Registration form' });
// });
//output looks like this in the terminal
// { name: 'trips', email: 'claywer@gmail.com' }
// { name: 'trips', email: 'hulk@email.com' }

//using the check method to validate name and email, then the validation result 
//method to see if validation passes or failed
////Now, when the user posts data to the server, if validation passes
// we can go ahead and create a new Registration object and
//attempt to save it. As the database operation is an asynchronous operation
// which returns a Promise, we can chain a .then() onto the end of it to deal
// with a successful insert and a .catch() to deal with any errors:

router.post('/',
  [
    check('name')
      .isLength({ min: 1 })
      .withMessage('Please enter a name'),
    check('email')
      .isLength({ min: 1 })
      .withMessage('Please enter an email'),
  ],

 (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const registration = new Registration(req.body);
    registration.save()
    .then(() => { res.send('Thank you for your registration!'); })
    .catch((err) => {
      console.log(err);
      res.send('Sorry! Something went wrong.');
    });

  } else {
    res.render('form', {
      title: 'Registration form',
      errors: errors.array(),
      data: req.body,
    });
  }

});

//export the router varaibe to use in other files
module.exports = router;