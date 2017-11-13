/*
CHECK FOR DATA ARRAY LENGTH IF LONGER THEN 7 CLEAR DATA ARRAY
*/
const {MongoClient, ObjectID} = require('mongodb');
//const {Data} = require('./models/weekly-budget.js');

 var Check = (newData) => { MongoClient.connect('mongodb://localhost:27017/CalcApp', (err, db) => {
     if(err) {
       return console.log('Unable to connect to mongoDB Servers...')
     }
     var id = '5a09d78854c84e0337683eb9';
     db.collection('weekdatas').findOne({_id: id}).then((doc) => {
       console.log('Searching data...');
       console.log(doc);
       //if data is greater then 7 delete all
       if(doc.data.length > 7) {
         db.collection('weekdatas').deleteMany({data}).then((res) => {
           console.log(res);
           return false;
         });
         //else return data back to function;
        } else {
         doc.data.push(newData);
         doc.data.save();
         return true;
       }
     })
   });
 };

// var Check = (newData) => {
//   Data.findById(id).then((doc) => {
//     console.log(doc);
//   })
// };
module.exports = {Check};
