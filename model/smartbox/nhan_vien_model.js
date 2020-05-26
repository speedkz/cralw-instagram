const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nhanVienSchema = new Schema({
    ID_NV: {
        type: Number
    },
    ID_DV: {
        type: Number
    },
    USERNAME: {
        type: String
    },
    PASSWORD: {
        type: String
    },
    FIRSTNAME: {
        type: String
    },
    LASTNAME: {
        type: String
    },
    BIRTHDAY: {
        type: Date
    },
    STT: {
        type: Number
    },
    EMAIL: {
        type: String
    },
    MOBILE: {
        type: String
    },
    DEVICE_TOKEN: {
        type: String
    },
    GIOI_TINH: {
        type: Boolean
    },
    AVATAR: {
        type: String
    },
    THEME: {
        type: String
    },
    SIM_KPI: {
        type: String
    },
    SIM_KPI_TYPE: {
        type: String
    },
    HSM_KPI: {
        type: String
    },
    DISABLE: {
        type: Boolean
    },
    LOG: {
        type: String
    },
});
module.exports = mongoose.model('nhan_vien', nhanVienSchema);