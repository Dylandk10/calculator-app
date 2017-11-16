/*
  This is to change the data manually if the user messed up entery
  or wants to add more.. taken from chrck-data-alt.js too
*/
const {MongoClient, ObjectID} = require('mongodb');
//ID for development purposes only
var {ID} = require('./models/id.js');
//var to hold dates of week to change
var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

var ChangeDataManually = () => {
  var id = ID();
  var hold;
  //ask what day they wanna change
  var getDay = propmt("Enter day you wish to chnage").toLowerCase();
    if(getDay != null) {
      //hold = index of day they wanna chnage
      days.forEach((el) => {
        if(el == getDay) {
          hold = days.indexOf(el);
        } else {
          console.log("Day not found Error");
        }
      });
    }
    var newData = prompt("Enter new amount for day") {
      parseInt(newData);
      //connect to datbase to change day
      MongoClient.connect('mongodb://localhost:27017/project2', (err, db) => {
        if(err) {
          return console.log("Unable to connect to dataBase");
        }
        //set new data in database
        db.collection('weekdatas').update({_id: id}, {$inc: {data.hold: newData}}).then(() => {
          console.log("Data added!");
        }).catch((err) => {
          console.log("Cant manually insert data!...");
        });
      });
    }
};

module.exports = {ChangeDataManually};
