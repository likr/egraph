'use strict';

import layerMatrix from '../misc/layer-matrix';

const crossingMatrix = (g, h1, h2) => {
  const n = h1.length,
        m = h2.length,
        a = layerMatrix(g, h1, h2),
        b = new Int8Array(m * m);

  for (let j2 = 0; j2 < m; ++j2) {
    let count = 0;
    for (let i2 = n - 1; i2 > 0; --i2) {
      const i1 = i2 - 1;
      count += a[i2 * m + j2];
      if (count) {
        for (let j1 = 0; j1 < m; ++j1) {
          b[j2 * m + j1] += j1 === j2 ? 0 : a[i1 * m + j1] * count;
        }
      }
    }
  }
  return b;
};

export default crossingMatrix;
