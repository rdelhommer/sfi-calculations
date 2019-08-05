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

export function mean(array: number[]): number {
  let filtered = array.filter(x => !Number.isNaN(x))
  var i,total = 0;
  for(i=0;i<filtered.length;i+=1){
      total+=filtered[i];
  }
  return total/filtered.length;
}

export function stDev(array: number[]){
  let filtered = array.filter(x => !Number.isNaN(x))
  var i, _mean = 0, diffSqredArr = [];
  _mean = mean(array);
  for(i=0;i<filtered.length;i+=1){
      diffSqredArr.push(Math.pow((filtered[i]-_mean),2));
  }
  return (Math.sqrt(diffSqredArr.reduce(function(firstEl, nextEl){
           return firstEl + nextEl;
         })/filtered.length));
};