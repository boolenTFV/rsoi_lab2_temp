var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var driverSchema = Schema({
  name: {type: String, required: true},
  lastName: {type: String, required: true},
  birthDate: {type: Date, required: true,  minlength:2, maxlength:40},
  __v: { type: Number, select: false}
}, {
  toObject: { virtuals: true },
  toJSON: {virtuals: true}
});
driverSchema.virtual('id').get(function () {
  return this._id;
});


var Driver = mongoose.model('driver', driverSchema);

module.exports = Driver;