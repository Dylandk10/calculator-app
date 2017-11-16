/*
CHECK FOR DATA ARRAY LENGTH IF LONGER THEN 7 CLEAR DATA ARRAY
*/
const {MongoClient, ObjectID} = require('mongodb');
//require weekly data
var {WeekData} = require('./models/weekly-budget.js');
//require daily data
var {DailyData} = require('./models/daily-data.js');
//ID for development purposes only
var {ID} = require('./models/id.js');

 var Check = (newData) => { MongoClient.connect('mongodb://localhost:27017/project2', (err, db) => {
     if(err) {
       return console.log('Unable to connect to mongoDB Servers...')
     }
     var id = ID();
     console.log(id);
     db.collection('weekdatas').findOne({_id: new ObjectID(id)}).then((doc) => {
       //search for id
       console.log('Searching data...');
       console.log(doc);
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
        Hold.save();
         console.log(Hold.data);
         //push new constructor to weekly data
         db.collection('weekdatas').update({_id: new ObjectID(id)}, {$push: {data: Hold.data}}, {upsert: true}).then((doc) => {
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
