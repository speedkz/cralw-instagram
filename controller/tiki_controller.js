const helpers = require('../helpers');
const mongoose = require('mongoose');
const TikiLaptopGaming = require('../model/tiki/laptop_gaming_model');
const Product = require('../model/tiki/product_model');
const TikiLaptop = mongoose.model("tiki_laptop", Product);
const TikiMacbook = mongoose.model("tiki_macbook", Product);
exports.getLaptopGaming = (req, res, next) => {
    TikiLaptopGaming.find()
        .then(result => {
            console.log(result.length)
            res.send(result);
        })
        .catch(err => res.status(400).send(err));
};
exports.addLaptopGaming = async (req, res, next) => {
    let totalPage = 3;
    let items = [];
    for (let i = 1; i <= totalPage; i++) {
        let uri = `https://tiki.vn/laptop-gaming/c5584?src=static_block&page=${i}`;
        await helpers(uri).then($ => {
            $('.product-item').each((_, x) => {
                let item = parseHtmlToObject($(x));
                items.push(item);
            })
        })
            .catch(e => {
                res.send(e);
            })
    }
    TikiLaptopGaming.deleteMany({}, (err, collection) => {
        if (err) throw err;
    });
    console.log("remove all");
    TikiLaptopGaming.insertMany(items).then(() => {
        console.log("done");
    })
        .catch(e => {
            console.log(e)
        })
}
exports.addLaptop = async (req, res, next) => {
    let totalPage = 19;
    let items = [];
    for (let i = 1; i <= totalPage; i++) {
        let uri = `https://tiki.vn/laptop/c8095?src=static_block&page=${i}`;
        await helpers(uri).then($ => {
            $('.product-item').each((_, x) => {
                let item = parseHtmlToObject($(x));
                items.push(item);
            })
        })
            .catch(e => {
                res.send(e);
            })
    }
    TikiLaptop.deleteMany({}, (err, collection) => {
        if (err) throw err;
    });
    console.log("remove all");
    TikiLaptop.insertMany(items).then(() => {
        console.log("done");
    })
        .catch(e => {
            console.log(e)
        })
}
exports.addMacbook = async (req, res, next) => {
    let totalPage = 1;
    let items = [];
    for (let i = 1; i <= totalPage; i++) {
        let uri = `https://tiki.vn/macbook-imac/c2458?src=static_block&page=${i}`;
        await helpers(uri).then($ => {
            $('.product-item').each((_, x) => {
                let item = parseHtmlToObject($(x));
                items.push(item);
            })
        })
            .catch(e => {
                res.send(e);
            })
    }
    TikiMacbook.deleteMany({}, (err, collection) => {
        if (err) throw err;
    });
    console.log("remove all");
    TikiMacbook.insertMany(items).then(() => {
        console.log("done");
    })
        .catch(e => {
            console.log(e)
        })
}
var parseHtmlToObject = ($) => {
    let salePercent = $.find(".sale-tag").text().substring(1, $.find(".sale-tag").text().indexOf("%")).trim();
    return new TikiLaptopGaming({
        id: $.attr("data-id"),
        title: $.attr("data-title"),
        image: $.find("img").attr("src"),
        url: $.find("a").attr("href"),
        brand: $.attr("data-brand"),
        category: $.attr("data-category"),
        finalPrice: $.attr("data-price"),
        regularPrice: Math.round($.attr("data-price") * (1 + salePercent / 100)),
        salePercent: salePercent,
        code: $.find(".code").text(),
        rateStar: $.find(".rating-content span").attr("style") ? $.find(".rating-content span").attr("style").substring(6, $.find(".rating-content span").attr("style").indexOf("%")).trim() * 0.05 : 0,
        review: $.find(".review").text().trim().toLowerCase() === "chưa có" ? 0 : ($.find(".review").text().substring(1, $.find(".review").text().indexOf("nhận xét")).trim()),
    });
};