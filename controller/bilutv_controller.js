const helpers = require('../helpers');
const Film = require('../model/film_model');

exports.addFilm = async (req, res, next) => {
    let totalPage = 80;
    let items = [];
    for (let i = 1; i <= totalPage; i++) {
        let uri = `https://bilutv.org/quoc-gia/trung-quoc/trang-${i}.html`;
        await helpers(uri).then($ => {
            $('.film-item').each((_, x) => {
                let film = parseHtmlToObject($(x));
                items.push(film);
            })
        })
            .catch(e => {
                res.send(e);
            })
    }
    Film.insertMany(items).then(() => {
        console.log("done");
    })
        .catch(e => {
            console.log(e)
        })
}
var parseHtmlToObject = async ($) => {
    let currentStatus = $.find("label:first-child").text();
    let image = $.find("img").attr("src");
    let url = $.find("a").attr("href");
    let name = $.find("p.name").text();
    let realName = $.find("p.real-name").text();
    await helpers(url).then($ => {
        let { director } = getFilmDetail($);
    })
        .catch(e => {
            console.log(e)
        });
    return new Film({
        currentStatus: currentStatus,
        image: image,
        url: url,
        updatedDate: Date.now(),
        name: name,
        realName: realName,
    });
};
var getFilmDetail = ($) => {
    $($(".film-info .info-y li:nth-child(2) a")).each((_, x) => {
        console.log(x)
    })
}