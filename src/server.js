const express = require('express');
const hbs = require('hbs');
const mongoose = require('./mongoose/mongoose.js');
//weekly data constructor
var {WeekData} = require('./mongoose/models/weekly-budget.js');
//require search function
var {Check} = require('./mongoose/check-data.js');
const port = 3000;
var app = express();

app.set('view engine', 'hbs');
//connect to public pages...
app.use(express.static(__dirname + '/../views'));
//home page get method
app.get('/', (req, res) => {
  res.render('index.hbs');
});


//get method to recieve data
app.get('/getdata', (req, res) => {
  console.log(req.query.amount);
  //make constructor for data
  var data = new WeekData({
    data: req.query.amount
  });
  //check data sith check data.js
  Check(req.query.amount);
  // data.save().then((user) => {
  //   console.log(user);
  //   res.render('index.hbs');
  // }).catch((e) => {
  //   res.status(400).send(e);
  // });

});

app.listen(port, () => {
  console.log(`Server starting on ${port}...`);
});
