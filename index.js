import { Indexer } from "./indexer.js";
import { Crawler } from "./crawler.js";
import * as readline from "readline";

const url = "https://alza.cz";

async function crawl() {
  for (let i = 0; i < 5; i++) {
    let newUrl = indexer.getUrl();
    if (newUrl != undefined) {
      try {
        let crawler = new Crawler(newUrl);
        let urls = await crawler;
        indexer.addUrl(urls);
      } catch {
        /* console.log("Error crawling: " + newUrl); */
      }
    } else {
      console.log("No other url to index!");
    }
  }
}

async function readInput() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    rl.question("Enter your query: ", (query) => {
      rl.close();
      resolve(query);
    });
  });
}

async function search() {
  let query = await readInput();
  let output = indexer.search(query);
  if (output.length) {
    console.log("These adresses suits your needs: " + output);
  } else {
    console.log("No match founded! Try again later.");
  }
}

const indexer = new Indexer();
indexer.addUrl([url]);

while (true) {
  await crawl();
  await search();
}
