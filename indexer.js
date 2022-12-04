export class Indexer {
  #index = Array();
  #blacklist = Array();

  constructor() {
    setInterval(() => {
      for (let i = 0; i < this.#blacklist.length; i++) {
        if (this.#blacklist[i][1] < Date.now - 3600000) {
          this.#index.push(this.#blacklist[i][0]);
          this.#blacklist.splice(i - 1, 1);
          console.log("yes");
        }
      }
    }, 1000);
  }

  addUrl(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (this.#index.indexOf(arr[i]) == -1 && this.#blacklist.indexOf(arr[i]) == -1) this.#index.push(arr[i]);
    }
  }

  removeUrl(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.#index = this.#index.filter((e) => e !== arr[i]);
    }
  }

  getUrl() {
    let time = Date.now;
    let url = this.#index[0];
    this.#blacklist.push([url, time]);
    this.#index.shift();
    return url;
  }
}
