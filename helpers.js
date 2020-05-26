const cheerio = require('cheerio');
const request = require('request-promise');
const getPageContent = (uri) => {
    const options = {
        uri,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        transform: (body) => {
            console.log(body)
            return cheerio.load(body)
        }
    }
    return request(options)
}
module.exports = getPageContent;