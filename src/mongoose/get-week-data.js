const {MongoClient, ObjectID} = require('mongodb');
//ID for development purposes only
var {ID} = require('./models/id.js');

var GetWeek = () => {
  MongoClient.connect('mongodb://localhost:27017/project2', (err, db) => {
    if(err) {
      return console.log('Unable to connect to servers...');
    }

    var id = ID();
    db.collection('weekdatas').findOne({_id: new ObjectID(id)}).then((doc) => {
      console.log("Searching threw data...");
      var hold = doc.data;
      var count = 0;
      hold.forEach((el) => {
        count += el;
        console.log(`Count: ${count}`);
      });
      //return the final of budget spent!!
      console.log(`Final Count: ${count}`);
      return count;
    }).catch((err) => {
      return console.log(`Error: ${err}`);
    });

    //second idea for ARRAY
    // db.collection('weekdatas').find({_id: '5a0b5af193dc3402a92d6545'}).forEach((el) => {
    //   var count = 0;
    //   var hold;
    //   hold = el.data += count;
    //   console.log(hold);
    // });
  });
}

module.exports = {GetWeek};
