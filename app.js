const express = require('express');
// var multer = require('multer'); //**********************
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// //New connection here
// const Mongoclient = require('mongodb').MongoClient;
// const  assert = require('assert');
// //connection URL
// const url = config.database;
// //Database Name
// const dbName = 'eliteRoofingLocal';
// //Use connect method to connect to the server
// Mongoclient.connect(url, function(err, client){
//   const db = client.db(dbName);
//   assert.equal(null, err);
//   // assert.ok(client.databases.length > 0);
//   console.log("Connected successfully to server second connection");
//   const collection = db.collection('jobs');
//   // collection.find({}).toArray(function ( err, docs ) {
//   //     console.log(docs);
//   // })
//   client.close();
// })


// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+ config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+ err);
});

const app = express();


const workOrderRouter = require('./sub-work-order-comparison/work-order.router');


// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());


// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
// app.use(passport.initialize());
// app.use(passport.session());
//
// require('./config/passport')(passport);

// app.use('/users', users);
// app.use('/announcements', announcements);
app.use('/work-orders', workOrderRouter);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+ port);
});
