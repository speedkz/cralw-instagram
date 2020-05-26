const helpers = require('../helpers');
const mongoose = require('mongoose');
const sharp = require('sharp');
const fs = require('fs');
const directory = './images';
const dimensions = [
    200, 1024
]
exports.resizeImages = (req, res, next) => {
    fs.readdirSync(directory).forEach(file => {
        if (file.includes("@x"))
            return false;
        let format = file.split(".")[1] || "jpg";
        dimensions.forEach(x => {
            sharp(`${directory}/${file}`)
                .resize(x) // width, height
                .toFile(`${directory}/${file.split(".")[0]}@x${x}.${format}`);
        })
    });
};