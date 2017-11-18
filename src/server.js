const express = require('express');
const hbs = require('hbs');
const mongoose = require('./mongoose/mongoose.js');
//weekly data constructor
var {WeekData} = require('./mongoose/models/weekly-budget.js');
//require search function
var {Check} = require('./mongoose/check-data.js');
//require check2 for alt method of checking data
var {Check2} = require('./mongoose/check-data-alt.js');
//require get week data to return week data
var {GetWeek} = require('./mongoose/get-week-data.js');
//require change data manually fuinction
var {ChangeDataManually} = require('./mongoose/change-manually.js');
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
  //set to false to make new entery..
  var checkCheck = true;
  //when true check threw other data!
  if(checkCheck) {
  //check data with check-data-alt.js
  Check2(req.query.amount);
  res.render('index.hbs');
  }
  //if false make new enter for data...
  if(!checkCheck) {
    var Data = new WeekData({
      data: req.query.amount
    });
    Data.save().then((res) => {
      console.log("Saving data to database...")
    }).catch((err) => {
      return console.log(`Error: ${err}`);
    });
    checkCheck = true;
    res.render('index.hbs');
  }
});

app.get('/getWeekData', (req, res) => {
  GetWeek();
  res.render('index.hbs');
});

app.get('/manuallyChangeData', (req, res) => {
  ChangeDataManually(req.query.dayInput, req.query.amountInput);
  res.render('index.hbs');
})

app.listen(port, () => {
  console.log(`Server starting on ${port}...`);
});
