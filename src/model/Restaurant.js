const mongoose  = require('mongoose')

mongoose.Promise = global.Promise;

const restaurantSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  store_name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  star: {
    type: Number,
    required: true,
  },
  avr_price: {
    type: Number,
    required: true,
  },
  open_time: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: false,
  },
  type: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('restaurant', restaurantSchema, 'restaurant')