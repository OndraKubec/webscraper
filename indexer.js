export class Indexer {
  #queue = Array();
  #blacklist = Array();
  #index = Array(Array(null));

  constructor() {
    setInterval(() => {
      for (let i = 0; i < this.#blacklist.length; i++) {
        if (this.#blacklist[i][1] < Date.now - 3600000) {
          this.#queue.push(this.#blacklist[i][0]);
          this.#blacklist.splice(i - 1, 1);
          console.log("yes");
        }
      }
    }, 1000);
  }

  addUrl(arr) {
    console.log("Indexing...")
    for (let i = 0; i < arr.length; i++) {
      let url = arr[i];
      if (this.#queue.indexOf(url) == -1 && this.#blacklist.indexOf(url) == -1)
        this.#queue.push(url);
      if (this.#index[0].indexOf(url) == -1) {
        this.#index[0].push(url);
        for (let i = 1; i < this.#index.length; i++) {
          for (let j = this.#index[i].length; j < this.#index[0].length; j++) {
            this.#index[i].push(false);
          }
        }
      }
      try {
        let keywords = arr[i].split("https://")[1].split(/[.,?,!,/,-,_]/);
        for (let i = 0; i < keywords.length; i++) {
          // check if keyword is indexed
          let addStatus = true;
          let existingPosition;
          for (let i = 1; i < this.#index.length; i++) {
            if (this.#index[i][0] == keywords[i]) {
              addStatus = false;
              existingPosition = i;
            }
          }
          if (addStatus) {
            // generate boolean array with new keyword
            let keywordArr = Array();
            keywordArr.push(keywords[i]);
            for (let i = 1; i < this.#index[0].length; i++) {
              if (i == this.#index[0].indexOf(url)) {
                keywordArr.push(true);
              } else {
                keywordArr.push(false);
              }
            }
            this.#index.push(keywordArr);
          } else {
            // keyword is already in index
            this.#index[existingPosition][this.#index[0].indexOf(url)] = true;
          }
        }
      } catch {}
    }
    // diagnostic of index table
    /* console.log("Number of indexed urls: " + (this.#index[0].length - 1));
    console.log("Number of indexed keywords: " + (this.#index.length - 1));
    let keyCount = 0;
    for (let i = 1; i < this.#index[1].length; i++) {
      if (this.#index[1][i] == true) keyCount++;
    }
    console.log("keyCount:" + keyCount); */
  }

  removeUrl(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.#queue = this.#queue.filter((e) => e !== arr[i]);
    }
  }

  getUrl() {
    let time = Date.now;
    let url = this.#queue[0];
    this.#blacklist.push([url, time]);
    this.#queue.shift();
    return url;
  }

  search(query) {
    let keywordPosition = Array();
    let outputArr = Array();
    for (let i = 1; i < this.#index.length; i++) {
      if (this.#index[i][0] == query) keywordPosition.push(i);
    }
    if(keywordPosition.length){
      for (let i = 0; i < keywordPosition.length; i++) {
        for (let j = 1; j < this.#index[keywordPosition[i]].length; j++) {
          if (this.#index[keywordPosition[i]][j] == true) {
            outputArr.push(this.#index[0][j]);
          }
        }
      }
    }
    return outputArr;
  }
}
