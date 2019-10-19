var mongoose = require('mongoose');
var uuid = require('node-uuid');
var Schema = mongoose.Schema;

var scheduleSchema = Schema({
  route: {type: String, required: true},
  driverId: {type: String, required: true},
  busId: {type: String, required: true},
  day: {type: String, required: true},
  time: {type: String, required: true},
  __v: { type: Number, select: false}
},{
  toJSON: {virtuals: true}
});

var Schedule = mongoose.model('schedule', scheduleSchema);

module.exports = Schedule;