var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var busSchema = Schema({
  model: { type: String, required: true,  minlength:2, maxlength:40},
  startDate: {type: Date, required: true},
  licensePlate: {type: String, required: true, length:6},
  __v: { type: Number, select: false}
},
{
  toObject: { virtuals: true },
  toJSON: {virtuals: true}
});
busSchema.virtual('id').get(function () {
  return this._id;
});

var Bus = mongoose.model('bus', busSchema);
module.exports = Bus;