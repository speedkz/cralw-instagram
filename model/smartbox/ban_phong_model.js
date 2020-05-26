const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const banPhongSchema = new Schema({
    ID_PB: {
        type: String,
    },
    TEN_PB: {
        type: String
    }
});
module.exports = mongoose.model('ban_phong', banPhongSchema);