export function newGuid() {
  var d = new Date().getTime();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
      d += performance.now(); //use high-precision timer if available
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

export function round(value: number, precision: number = 1) {
  var y = +value + (precision/2);
  return y - (y % (+precision));
}

declare global {
  interface Array<T> {
    filterNumbers: () => number[]
    mean: () => number
    stDev: () => number
    sum: () => number
  }
}

Array.prototype.filterNumbers = function() {
  return this
    .filter(x => x != null)
    .map(x => Number(x))
    .filter(x => !Number.isNaN(x))
}

Array.prototype.sum = function() {
  let filtered = this
    .filterNumbers()

  if (filtered.length === 0) return null

  return filtered
    .reduce((a, b) => a + b)
}

Array.prototype.mean = function() {
  let filtered = this.filterNumbers()

  if (filtered.length === 0) return null

  var i,total = 0;
  for(i=0;i<filtered.length;i+=1){
      total+=filtered[i];
  }
  return total/filtered.length;
}

Array.prototype.stDev = function() {
  let filtered = this.filterNumbers()

  let n = filtered.length;
  if (n === 0) return null

  let mean = this.reduce((a,b) => a+b, 0)/n;
  return Math.sqrt(this.map(x => Math.pow(x-mean,2)).reduce((a,b) => a+b, 0)/(n - 1));
}