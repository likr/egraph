'use strict';
module.exports = function priority(g, h1, h2, x1) {
  var x2 = {};
  var xUsed = new Set();
  for (let u of h2) {
    let sum = 0;
    for (let v of g.inVertices(u)) {
      sum += x1[v];
    }
    var xu0 = +(sum / g.inDegree(u)).toFixed();
    var xuPlus = xu0,
        xuMinus = xu0;
    while (xUsed.has(xuPlus)) {
      ++xuPlus;
    }
    while (xUsed.has(xuMinus)) {
      --xuMinus;
    }
    x2[u] = xu0 - xuMinus < xuPlus - xu0 ? xuMinus : xuPlus;
    xUsed.add(x2[u]);
  }
  return x2;
};
