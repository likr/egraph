'use strict';

const baryCenter = (g, h1, h2, inverse=false) => {
  const centers = {},
        hasEdge = inverse ? (u, v) => g.edge(u, v) : (u, v) => g.edge(v, u);
  [h1, h2] = inverse ? [h2, h1] : [h1, h2];
  for (let u of h2) {
    let sum = 0,
        count = 0;
    for (let i = 0; i < h1.length; ++i) {
      let v = h1[i];
      if (hasEdge(u, v)) {
        sum += i;
        count += 1;
      }
    }
    centers[u] = sum / count;
  }
  h2.sort((u, v) => {
    let d;
    return (d = centers[u] - centers[v]) === 0 ? u - v : d;
  });
};

module.exports = baryCenter;
