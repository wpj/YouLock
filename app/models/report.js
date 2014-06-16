var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReportSchema = new Schema({
  lockupId: { type: Number, required: true, index: true },
  dateCreated: { type: Date, required: true, default: Date.now },
  reportDescription: { type: String, required: true }
});

module.exports = mongoose.model('Report', ReportSchema);