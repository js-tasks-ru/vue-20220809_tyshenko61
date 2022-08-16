import { createApp } from './vendor/vue.esm-browser.js';


createApp({
  data() {
    return {
      first: null,
      second: null,
      operation: null,
    };
  },

 computed: {
   result() {
    let res = null;
    if (this.operation === "sum") {
       res = this.first + this.second;
     }
     else if (this.operation === "subtract") {
      res = this.first + this.second;
    }
    else if (this.operation === "multiply") {
      res = this.first * this.second;
    }
    else if (this.operation === "divide") {
      if (this.second) {
        res = this.first / this.second;
      }
    }
    return res;
   }
 }
}).mount('#app');
