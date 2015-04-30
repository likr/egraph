'use strict';

const layerMatrix = (g, h1, h2) => {
  const n = h1.length,
        m = h2.length,
        orders = {},
        a = new Int8Array(n * m);

  for (let i = 0; i < m; ++i) {
    orders[h2[i]] = i;
  }
  for (let i = 0; i < n; ++i) {
    const u = h1[i];
    for (const v of g.outVertices(u)) {
      a[i * m + orders[v]] = 1;
    }
  }
  return a;
};

export default layerMatrix;
