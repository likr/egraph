'use strict';

const layerMatrix = require('../misc/layer-matrix');

const baryCenter = (g, h1, h2, inverse=false) => {
  const centers = {},
        n = h1.length,
        m = h2.length,
        a = layerMatrix(g, h1, h2),
        cmp = (u, v) => {
          let d;
          return (d = centers[u] - centers[v]) === 0 ? u - v : d;
        };
  if (inverse) {
    for (let i = 0; i < n; ++i) {
      let sum = 0,
          count = 0;
      for (let j = 0; j < m; ++j) {
        const aij = a[i * m + j];
        count += aij;
        sum += j * aij;
      }
      centers[h1[i]] = sum / count;
    }
    h1.sort(cmp);
  } else {
    for (let j = 0; j < m; ++j) {
      let sum = 0,
          count = 0;
      for (let i = 0; i < n; ++i) {
        const aij = a[i * m + j];
        count += aij;
        sum += i * aij;
      }
      centers[h2[j]] = sum / count;
    }
    h2.sort(cmp);
  }
};

module.exports = baryCenter;
