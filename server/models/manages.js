const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const manageSchema = new Schema({
  "manageId": { type: String },
  "manager": { type: String },
  "password": { type: Number }
})

module.exports = mongoose.model('manage', manageSchema)
