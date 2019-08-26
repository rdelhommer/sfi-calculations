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

declare global {
  interface Array<T> {
    filterNumbers: () => number[]
    mean: () => number
    stDev: () => number
  }
}

Array.prototype.filterNumbers = function() {
  return this
    .filter(x => x != null)
    .map(x => Number(x))
    .filter(x => !Number.isNaN(x))
}

Array.prototype.mean = function() {
  let filtered = this.filter(x => !Number.isNaN(x))
  var i,total = 0;
  for(i=0;i<filtered.length;i+=1){
      total+=filtered[i];
  }
  return total/filtered.length;
}

Array.prototype.stDev = function() {
  let filtered = this.filter(x => !Number.isNaN(x))
  var i, _mean = 0, diffSqredArr = [];
  _mean = this.mean();
  for(i=0;i<filtered.length;i+=1){
      diffSqredArr.push(Math.pow((filtered[i]-_mean),2));
  }
  return (Math.sqrt(diffSqredArr.reduce(function(firstEl, nextEl){
           return firstEl + nextEl;
         })/filtered.length));
}