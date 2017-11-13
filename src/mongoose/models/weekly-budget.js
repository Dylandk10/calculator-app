const mongoose = require('mongoose');

var WeekData = mongoose.model('WeekData', {
  data: [{
    type: Number
  }]
});

module.exports = {WeekData};
