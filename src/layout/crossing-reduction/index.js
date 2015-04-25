'use strict';

const cross = require('./cross'),
      baryCenter = require('./bary-center');

const crossAll = (g, layers) => {
  let count = 0;
  for (let i = 1; i < layers.length; ++i) {
    count += cross(g, layers[i - 1], layers[i]);
  }
  return count;
};

const crossingReduction = (g, layers) => {
  const n = layers.length,
        repeat = 8;
  let c0 = Infinity,
      c1 = crossAll(g, layers);
  for (let loop = 0; loop < repeat && c0 !== c1; ++loop) {
    for (let i = 1; i < n; ++i) {
      baryCenter(g, layers[i - 1], layers[i]);
    }
    for (let i = n - 1; i > 0; --i) {
      baryCenter(g, layers[i - 1], layers[i], true);
    }
    c0 = c1;
    c1 = crossAll(g, layers);
  }

  for (let i = 0; i < layers.length; ++i) {
    const layer = layers[i];
    for (let j = 0; j < layer.length; ++j) {
      const u = layer[j];
      g.vertex(u).order = j;
    }
  }
};

module.exports = crossingReduction;
