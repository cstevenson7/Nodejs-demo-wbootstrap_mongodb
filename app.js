//  importing both the express module and (the export value of) our 
// routes file into the application. The require function we’re using to do 
// this is a built-in Node function which imports an object from another 
// file or module. 

const express = require('express');
const routes = require('./routes/index');
const path = require('path');
//body-parser is how we retrieve that data when the user submite the form, it makes the form data avaialbe on the request body
const bodyParser = require ('body-parser');

//this creates a new Express app
const app = express();

//configureing the app to use PUG as a layout engine and
// to look for the templates inside the views folder.
//Using Nodes native Path Module which provides utilities for
// working with file and directory paths
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//telling the app to use body-parser and format the data being POSTed to the 
//server using the body-parser urlencoded method
app.use(bodyParser.urlencoded({ extended: true }))
//this tells the app whenever it recieved a request from forward slash
//anything use the routes file
app.use('/',routes);

//Let’s give the app some polish and add some styling using Bootstrap. 
// We can serve static files such as images, JavaScript files and CSS files  
// in Express using the built-in express.static middleware function.
//Now we can load files that are in the public directory.
app.use(express.static('public'));


//Export the app varialbe so that it can be imported and
// used in other files
module.exports = app;