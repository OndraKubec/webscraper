import fetch from "node-fetch";
import * as cheerio from "cheerio";

export class Crawler {
  constructor(url) {
    console.log("Crawling: " + url);

    const crawl = async () => {
      const response = await fetch(url);
      const body = await response.text();

      const $ = cheerio.load(body);
      const links = $("a");

      const arr = [];
      $(links).each(function (i, link) {
        link = $(link).attr("href");

        if (link.slice(url.length)[0] == url) {
          link = url + link;
        }

        arr.push(link);
      });

      return arr;
    };

    return crawl().then((output) => output);
  }
}
