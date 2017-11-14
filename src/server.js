const express = require('express');
const hbs = require('hbs');
const mongoose = require('./mongoose/mongoose.js');
//weekly data constructor
var {WeekData} = require('./mongoose/models/weekly-budget.js');
//require search function
var {Check} = require('./mongoose/check-data.js');
//require get week data to return week data
var {GetWeek} = require('./mongoose/get-week-data.js');
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
  //check data with check data.js
  Check(req.query.amount);
  res.render('index.hbs');

});

app.get('/getWeekData', (req, res) => {
  GetWeek();
});

app.listen(port, () => {
  console.log(`Server starting on ${port}...`);
});
