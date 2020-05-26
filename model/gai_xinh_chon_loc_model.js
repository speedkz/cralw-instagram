const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gaiXinhChonLocSchema = new Schema({
    alt: {
        type: String,
    },
    url: {
        type: String,
    },
    rootUrl: {
        type: String,
    },
    name: {
        type: String
    },
    category: {
        type: String
    }
});

module.exports = mongoose.model('gai_xinh_chon_loc', gaiXinhChonLocSchema);