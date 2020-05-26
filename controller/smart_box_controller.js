const helpers = require('../helpers');
const mongoose = require('mongoose');
const BanPhong = require('../model/smartbox/ban_phong_model');
const NhanVien = require('../model/smartbox/nhan_vien_model');
const VBCV_TOTRINH_HDTV = require('../model/smartbox/hdtv_totrinhs_model');
const FILE_Y_KIEN = require('../model/smartbox/file_y_kien.model');
exports.getDsBanPhong = (req, res, next) => {
    BanPhong.find()
        .then(result => {
            res.send({
                success: true,
                data: result
            });
        })
        .catch(err => res.status(400).send(err));
};
exports.getSmTiepNhanTTinh = (req, res, next) => {
    VBCV_TOTRINH_HDTV.find()
        .then(result => {
            res.send({
                success: true,
                data: result
            });
        })
        .catch(err => res.status(400).send(err));
};
exports.searchEmployee = (req, res, next) => {
    NhanVien.find(req.query)
        .then(result => {
            res.send({
                success: true,
                data: result
            });
        })
        .catch(err => res.status(400).send(err));
}
exports.searchFileYKien = (req, res, next) => {
    FILE_Y_KIEN.find(req.query)
        .then(result => {
            res.send({
                success: true,
                data: result
            });
        })
        .catch(err => res.status(400).send(err));
}