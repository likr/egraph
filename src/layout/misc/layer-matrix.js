'use strict';

const layerMatrix = (g, h1, h2) => {
  const n = h1.length,
        m = h2.length,
        a = new Int8Array(n * m);
  let index = 0;
  for (let i = 0; i < n; ++i) {
    const u = h1[i];
    for (let j = 0; j < m; ++j) {
      const v = h2[j];
      a[index++] = g.edge(u, v) ? 1 : 0;
    }
  }
  return a;
};

module.exports = layerMatrix;
