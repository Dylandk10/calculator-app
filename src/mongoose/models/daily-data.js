const mongoose = require('mongoose');

var DailyData = mongoose.model('DailyData', {
  data: {
    type: Number
  }
});
module.exports = {DailyData};
