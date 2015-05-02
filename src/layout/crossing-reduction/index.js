'use strict';

import baryCenter from './bary-center';

const crossingReduction = (g, layers) => {
  const n = layers.length,
        repeat = 8;
  for (let loop = 0; loop < repeat; ++loop) {
    for (let i = 1; i < n; ++i) {
      baryCenter(g, layers[i - 1], layers[i]);
    }
    for (let i = n - 1; i > 0; --i) {
      baryCenter(g, layers[i - 1], layers[i], true);
    }
  }
};

export default crossingReduction;
