const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hdtvToTrinhSchema = new Schema({
    ID_VB: {
        type: Number
    },
    KY_HIEU: {
        type: String
    },
    TRICH_YEU: {
        type: String
    },
    NOI_BAN_HANH: {
        type: String
    },
    ND_Chi_Dao: {
        type: String
    },
    NGAY_TAO: {
        type: Date
    },
    NGAY_VB: {
        type: Date
    },
    NGAY_NHAN: {
        type: Date
    }
});
module.exports = mongoose.model('VBCV_TOTRINH_HDTV', hdtvToTrinhSchema);