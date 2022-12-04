import { Indexer } from "./indexer.js";
import { Crawler } from "./crawler.js";

const indexer = new Indexer();

let crawler = new Crawler("https://alza.cz");
let urls = await crawler;

indexer.addUrl(urls);

for (let i = 0; i < 100; i++) {
  console.log(indexer.getUrl());
}
