require('dotenv').config();
const mongoose = require('mongoose');
//mongoose connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  mongoose.connection
    .on('open', () => {
      console.log('Mongoose connection open');
    })
    .on('error', (err) => {
      console.log(`Connection error: ${err.message}`);
    });


require('./models/Registration');
// importing the Epress app we created in app.js
//(can leave off the .js bit in the require statement )
const app = require('./app');



//telling the app to listen on port 3000 for incoming connections and
//print message to console saying the server is running
const server = app.listen(3000,() => {
    console.log(`Express is running on port ${server.address().port}`)
});

