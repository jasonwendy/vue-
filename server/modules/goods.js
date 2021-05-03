var mongoose = require("mongoose")
//require是node默认提供的类库自动到node_modules里面去找。
var Schema = mongoose.Schema;
var goom = new Schema({
      "productId": String,
      "productName": String,
      "salePrice": Number,
      "productImage": String,
      "productUrl": String,
      "checked":String,
      "productNum":Number,
      "purl":String

})

module.exports = mongoose.model('Good', goom);
//node默认的暴露方式，前端不适用。