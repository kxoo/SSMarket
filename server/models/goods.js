const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  "productId": {type: String},
  "productName": {type: String},
  "salePrice": {type: Number},
  "brand": { type: String },
  "type": { type: String },
  "productImage": {type: String}
})

module.exports = mongoose.model('good', productSchema)
