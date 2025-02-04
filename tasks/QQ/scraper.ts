import axios from "axios";
import cheerio from "cheerio";
import {log} from '../../src/utils';

let version: string, url: string

async function init() {
    //获得QQ下载页面
    let axiosResponse = await axios.get("https://im.qq.com/pcqq")
    let html = axiosResponse.data as string

    //挂载页面
    const $ = cheerio.load(html)

    //获取下载页面的版本号DOM
    let version_box = $('.desc-version');
    if (!version_box) {
        log("Error:Can't got valid dom node desc-version")
        throw "Scraping failed:DOM changed"
    }
    //获取版本号文本
    version = version_box.text()
    console.log(version)

    //获取下载按钮DOM
    let download_box = $('.btn-downlond').children("a");
    if (!download_box) {
        log("Error:Can't got valid dom node btn-downlond")
        throw "Scraping failed:DOM changed"
    }
    //获取下载链接
    url = download_box.attr('href') as string
    console.log(url)
}

function getVersion(): string {
    return version
}

function getDownloadLink(): string {
    return url
}


export {
    init, getVersion, getDownloadLink
}