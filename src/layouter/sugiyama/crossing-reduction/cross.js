'use strict';

import layerMatrix from '../misc/layer-matrix';

const cross = function (g, h1, h2) {
  const n = h1.length,
        m = h2.length,
        a = layerMatrix(g, h1, h2);

  let result = 0;
  for (let j2 = 0; j2 < m - 1; ++j2) {
    let count = 0;
    for (let i2 = n - 1, index1 = i2 * m + j2; i2 > 0; --i2, index1 -= m) {
      const i1 = i2 - 1;
      count += a[index1];
      if (count) {
        for (let index2 = i1 * m + j2 + 1, stop = i1 * m + m; index2 < stop; ++index2) {
          result += a[index2] * count;
        }
      }
    }
  }
  return result;
};

export default cross;
