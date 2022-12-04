import fetch from "node-fetch";
import * as cheerio from "cheerio";

export class Crawler {
  constructor(url) {
    const crawl = async () => {
      const response = await fetch(url);
      const body = await response.text();

      const $ = cheerio.load(body);
      const links = $("a");

      const arr = [];
      $(links).each(function (i, link) {
        arr.push($(link).attr("href"));
      });
      return arr;
    };

    return crawl().then((output) => output);
  }
}
