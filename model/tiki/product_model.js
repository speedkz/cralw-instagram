const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: {
        type: Number,
    },
    image: {
        type: String,
    },
    url: {
        type: String,
    },
    title: {
        type: String,
    },
    finalPrice: {
        type: String,
    },
    regularPrice: {
        type: String,
    },
    salePercent: {
        type: Number,
    },
    brand: {
        type: String,
    },
    category: {
        type: String
    },
    discountCode: {
        type: String
    },
    rateStar: {
        type: String
    },
    review: {
        type: String
    },
    sku: {
        type: String
    },
    topFeature: {
        type: Array
    }
});
module.exports = productSchema;