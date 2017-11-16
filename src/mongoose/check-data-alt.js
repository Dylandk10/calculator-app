/*
  ()()()()() USE THIS MODULE INSTEAD! ()()()()
  Alt idea for checking data. Now it checks data same way
  but it also checks days of the week so you can only push
  one number a day at a time for daily budget!

  --K3LLY--
*/

const {MongoClient, ObjectID} = require('mongodb');
var {DailyData} = require('./models/daily-data.js');
//ID for development purposes only
var {ID} = require('./models/id.js');

var Check2 = (newData) => {
  MongoClient.connect('mongodb://localhost:27017/project2', (err, db) => {
    if(err) {
      return console.log("Unable to connect to mongoDB...");
    }
    var date = new Date().toString();
    console.log(date);

    var id = ID();
    //hold constructor to hold data to push to mongo/data
    var Hold = new DailyData({
      data: newData
    });
    db.collection('weekdatas').findOne({_id: new ObjectID(id)}).then((doc) => {
      //if data is to long clear field for new week data
      if(doc.data.length > 7) {
        db.collection('weekdatas').update({_id: id}, {$set: {data: []}}).then(() => {
          console.log('Cleared array of data..');
        }).catch((err) => {
          console.log(`Error could not clear data: ${err}`);
        });
      }
      if(date.includes('Mon') && doc.data.length == 0) {
        db.collection('weekdatas').update({_id: id}, {$push: {data: Hold.data}}, {upsert: true}).then((doc) => {
          console.log('Data Saved!!!');
        }).catch((e) => {
          console.log(`Data not Saved!! ${e}`);
        });
      }
      else if(date.includes('Tues') && doc.data.length == 1) {
          db.collection('weekdatas').update({_id: id}, {$push: {data: Hold.data}}, {upsert: true}).then((doc) => {
            console.log('Data Saved!!!');
          }).catch((e) => {
            console.log(`Data not Saved!! ${e}`);
          });
      }
      else if (date.includes('Wed') && doc.data.length == 2) {
        db.collection('weekdatas').update({_id: id}, {$push: {data: Hold.data}}, {upsert: true}).then((doc) => {
          console.log('Data Saved!!!');
        }).catch((e) => {
          console.log(`Data not Saved!! ${e}`);
        });
      }
      else if(date.includes('Thurs') && doc.data.length == 3) {
        db.collection('weekdatas').update({_id: id}, {$push: {data: Hold.data}}, {upsert: true}).then((doc) => {
          console.log('Data Saved!!!');
        }).catch((e) => {
          console.log(`Data not Saved!! ${e}`);
        });
      }
      else if(date.includes('Fri') && doc.data.length == 4) {
        db.collection('weekdatas').update({_id: id}, {$push: {data: Hold.data}}, {upsert: true}).then((doc) => {
          console.log('Data Saved!!!');
        }).catch((e) => {
          console.log(`Data not Saved!! ${e}`);
        });
      }
      else if(date.includes('Sat') && doc.data.length == 5) {
        db.collection('weekdatas').update({_id: id}, {$push: {data: Hold.data}}, {upsert: true}).then((doc) => {
          console.log('Data Saved!!!');
        }).catch((e) => {
          console.log(`Data not Saved!! ${e}`);
        });
      }
      else if(date.includes('Sun') && doc.data.length == 6) {
        db.collection('weekdatas').update({_id: id}, {$push: {data: Hold.data}}, {upsert: true}).then((doc) => {
          console.log('Data Saved!!!');
        }).catch((e) => {
          console.log(`Data not Saved!! ${e}`);
        });
      }
       else {
        if(confirm("Do you wish to add more to todays budget?") == true) {
          console.log("Send add more function");
          //call change data manually function
          //CALL IT HERE()()()()...
        } else {
          console.log("Cancled action..");
        }
      }
    }).catch((err) => {
      return console.log(`Error: ${err}`);
    });
  });
};

module.exports = {Check2};
