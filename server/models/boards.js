const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  "header": {type: String},
  "content": {type: String},
  "reader": {type: Number},
  "time": {type:Number}
})

module.exports = mongoose.model('board', productSchema)
