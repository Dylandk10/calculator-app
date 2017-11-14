/*
CHECK FOR DATA ARRAY LENGTH IF LONGER THEN 7 CLEAR DATA ARRAY
*/
const {MongoClient, ObjectID} = require('mongodb');
//require weekly data
var {WeekData} = require('./models/weekly-budget.js');
//require daily data
var {DailyData} = require('./models/daily-data.js');

 var Check = (newData) => { MongoClient.connect('mongodb://localhost:27017/project2', (err, db) => {
     if(err) {
       return console.log('Unable to connect to mongoDB Servers...')
     }
     var id = '5a09d78854c84e0337683eb9';
     db.collection('weekdatas').findOne({_id: new ObjectID('5a09d78854c84e0337683eb9')}).then((doc) => {
       //search for id
       console.log('Searching data...');
       console.log(doc);
       //if null
       if(doc == null) {
         //make new database
         var Data = new WeekData({
           data: doc.data
         });
         Data.save().then(() => {
           console.log("Saving data to database");
         }).catch((e) => {
           console.log(`Unable to make new query ${e}`);
         });
       }
       //if data is greater then 7 delete all
       if(doc.data.length > 7) {
         //delete all data
         db.collection('weekdatas').deleteMany({data}).then((res) => {
           console.log(`Deleting data ${res}`);

           return false;
         }).catch((err) => {
           return console.log(`Error: ${err}`);
         })
         //else return data back to function;
        } else {
        //call constructor for mongoose
        var Hold = new DailyData({
          data: newData
        });
         console.log(Hold.data);
         //push new constructor to weekly data
         db.collection('weekdatas').update({_id: '5a09d78854c84e0337683eb9'}, {$push: {data: Hold.data}}).then((doc) => {
           console.log('Data saved!!!');
         }).catch((e) => {
           console.log(`Data not saved!!! ${e}`);
         });
         return true;
       }
     })
   });
 };

module.exports = {Check};
