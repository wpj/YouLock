var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReportSchema = new Schema({
  lockupId: { type: String, required: true, index: true },
  dateCreated: { type: Date, required: true, default: Date.now },
  reportDescription: { type: String, required: true },
  theft: { type: Boolean, required: true, default: false},
  missing: { type: Boolean, required: true, default: false}
});

module.exports = mongoose.model('Report', ReportSchema);