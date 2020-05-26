const helpers = require('../helpers');
const GaiXinhChonLoc = require('../model/gai_xinh_chon_loc_model');
const glTarget = "gaixinhchonloc";
const urls =
    `https://www.instagram.com/${glTarget}/`
const fs = require('fs');
const puppeteer = require('puppeteer');
request = require('request');
var isDownloading = false;
exports.addImages = async (req, res, next) => {
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    async function getDataPuppeterr(url, selector) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        return await handlerLazyLoading(browser, page);
    }
    async function getDataPuppeterrWithoutLazyLoading(url, selector) {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url);
            let srcs = await page.evaluate(selector => {
                let srcs = [];
                document.querySelectorAll(selector).forEach(element => {
                    if (!srcs.includes(element.src) && element.height > 200) {
                        srcs.push(element.src)
                    }
                })
                return srcs;
            }, selector)
            await browser.close();
            return srcs;
        }
        catch (err) {
            console.log(err)
        }
    }
    handlerLazyLoading = async (browser, page) => {
        // Get the height of the rendered page
        const bodyHandle = await page.$('body');
        //const { height } = await bodyHandle.boundingBox();
        const height = 94992;
        await bodyHandle.dispose();
        let data = [];
        let imgUrls = [];
        // Scroll one viewport at a time, pausing to let content load
        const viewportHeight = page.viewport().height;
        let viewportIncr = 0;
        while (viewportIncr + viewportHeight < height) {
            let { srcs, urls } = await page.evaluate(_viewportHeight => {
                window.scrollBy(0, _viewportHeight);
                let srcs = [];
                document.querySelectorAll("img").forEach(element => {
                    if (element.height > 200)
                        srcs.push(element.src)
                })
                let urls = [];
                document.querySelectorAll("a").forEach(element => {
                    if (element.href.includes("https://www.instagram.com/p"))
                        urls.push(element.href)
                })
                return {
                    srcs: srcs,
                    urls: urls
                };
            }, viewportHeight);
            urls.forEach(url => {
                if (!imgUrls.includes(url)) {
                    imgUrls.push(url)
                }
            })
            srcs.forEach(src => {
                if (!data.includes(src)) {
                    data.push(src)
                }
            })
            await wait(100);
            let scrollHeight = await page.evaluate(_ => {
                return document.body.scrollHeight;
            });
            console.log(scrollHeight)
            viewportIncr = viewportIncr + viewportHeight;
        }
        // Scroll back to top
        await page.evaluate(_ => {
            window.scrollTo(0, 0);
        });
        // Some extra delay to let images load
        await wait(500);
        await browser.close();
        return {
            data: data,
            imgUrls: imgUrls
        };
    }
    async function getDataJsDom(url, selector, timeout) {
        const virtualConsole = new jsdom.VirtualConsole();
        virtualConsole.sendTo(console, { omitJSDOMErrors: true });
        const dom = await JSDOM.fromURL(url, {
            runScripts: "dangerously",
            resources: "usable",
            virtualConsole
        });
        const data = await new Promise((res, rej) => {
            const started = Date.now();
            const timer = setInterval(() => {
                const elements = dom.window.document.querySelectorAll(selector);
                elements.forEach((element, i) => {
                    if (element) {
                        download(element.src, i);
                        res(element.textContent);
                        clearInterval(timer);
                    }
                    else if (Date.now() - started > timeout) {
                        rej("Timed out");
                        clearInterval(timer);
                    }
                })
            }, 100);
        });
        dom.window.close();
        return data;
    }
    const selector = "img";
    if (isDownloading)
        return false;
    let { srcs, imgUrls } = await getDataPuppeterr(urls, selector, 2000);
    let index = 0;
    let existedImages = await GaiXinhChonLoc.find({ category: glTarget });
    index = existedImages.length + 1;
    for (let i = 0; i < imgUrls.length; i++) {
        if (existedImages.find(x => x.rootUrl == imgUrls[i]))
            continue;
        let rootUrl = imgUrls[i];
        let more = await getDataPuppeterrWithoutLazyLoading(rootUrl, selector, 2000);
        // srcs.push(...more);
        // console.log(srcs.length, srcs)
        if (!more)
            continue;
        for (let i = 0; i < more.length; i++) {
            await download(rootUrl, more[i], index);
            index++;
        }
    }
    async function download(rootUrl, uri, filename, callback) {
        let predix = `${glTarget}_`
        if (!uri)
            return false;
        await request.head(uri, function (err, res, body) {
            if (res) {
                let contentType = res.headers['content-type'];
                let type;
                if (contentType) {
                    type = contentType.includes('jpeg') ? 'jpeg' : "png"
                }
                let contentLength = res.headers['content-length'];
                request(uri).pipe(fs.createWriteStream(`high_quality_images/${glTarget}/${predix}_${filename}.${type}`));
                let items = [
                    {
                        name: `${predix}_${filename}.${type}`,
                        url: uri,
                        rootUrl: rootUrl,
                        alt: "beautiful_girl",
                        type: glTarget
                    }
                ]
                GaiXinhChonLoc.insertMany(items);
                isDownloading = true;
            }
        });
    };
    function wait(ms) {
        return new Promise(resolve => setTimeout(() => resolve(), ms));
    }
}