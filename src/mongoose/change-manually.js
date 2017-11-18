/*
  This is to change the data manually if the user messed up entery
  or wants to add more.. taken from chrck-data-alt.js too
*/
const {MongoClient, ObjectID} = require('mongodb');
//ID for development purposes only
var {ID} = require('./models/id.js');
//var to hold dates of week to change
var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

var ChangeDataManually = (dayInput, amountInput) => {
  var id = ID();
  var hold;
  //make lowercase to match array
  dayInput = dayInput.toLowerCase();
  //if datas is not null find index of array
  if(dayInput != null) {
    days.forEach((el) => {
      if(el == dayInput) {
        hold = days.indexOf(el);
      }
      });
      console.log(`Index of data entered is ${hold}`);
    } else {
    return console.log("Day not found Error...");
  }
  parseInt(amountInput);
  MongoClient.connect('mongodb://localhost:27017/project2', (err, db) => {
    if(err) {
      return console.log("Unable to connect to mongodb...");
    }
    var newData;
    //find data to make hold variable
    db.collection('weekdatas').findOne({_id: id}).then((doc) => {
      newData = doc.data[hold];
    }).catch((e) => {
      return console.log(`Error: ${e}`);
    });
    //replace the data array with new data...
    db.collection('weekdatas').update({_id: id}, {$set: {newData: amountInput}}).then(() => {
      console.log("Data added manually");
    }).catch((err) => {
      return console.log("Cant insert data!...");
    })
  });
};

module.exports = {ChangeDataManually};
