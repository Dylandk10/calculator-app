const {MongoClient, ObjectID} = require('mongodb');

var GetWeek = () => {
  MongoClient.connect('mongodb://localhost:27017/project2', (err, db) => {
    if(err) {
      return console.log('Unable to connect to servers...');
    }

    var id = '5a09d78854c84e0337683eb9';
    db.collection('weekdatas').findOne({_id: new ObjectID(id)}).then((doc) => {
      console.log("Searching threw data...");
      var hold = doc.data;
      var count = 0;
      hold.forEach((el) => {
        count += el;
        console.log(`Count: ${count}`);
      });
    }).catch((err) => {
      return console.log(`Error: ${err}`);
    })
  });
}

module.exports = {GetWeek};
