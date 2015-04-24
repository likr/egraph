'use strict';

const cross = require('./cross'),
      baryCenter = require('./bary-center'),
      greedySwitch = require('./greedy-switch'),
      layerEdges = require('../misc/layer-edges'),
      crossingEdges = require('../misc/crossing-edges');

const crossAll = (g, layers) => {
  let count = 0;
  for (let i = 1; i < layers.length; ++i) {
    count += cross(g, layers[i - 1], layers[i]);
  }
  return count;
};

const fixType2Conflicts = (g, layers) => {
  for (let i = 1; i < layers.length; ++i) {
    for (const [u1, v1] of layerEdges(g, layers[i - 1], layers[i])) {
      let l = Infinity,
          k2 = -Infinity;
      const dummy1 = g.vertex(u1).dummy && g.vertex(v1).dummy;
      for (const [u2, v2] of crossingEdges(g, layers[i - 1], layers[i], u1, v1)) {
        const dummy2 = g.vertex(u2).dummy && g.vertex(v2).dummy;
        if (dummy1 && dummy2) {
          const lTmp = layers[i - 1].indexOf(u2);
          if (lTmp < l) {
            l = lTmp;
            k2 = layers[i].indexOf(v2);
          }
        }
      }
      if (k2 > -Infinity) {
        const k1 = layers[i].indexOf(v1),
              v2 = layers[i][k2];
        let tmp = layers[i][k1];
        layers[i][k1] = layers[i][k2];
        layers[i][k2] = tmp;
        tmp = g.vertex(v1).order;
        g.vertex(v1).order = g.vertex(v2).order;
        g.vertex(v2).order = tmp;
      }
    }
  }
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
  for (let i = 1; i < n; ++i) {
    greedySwitch(g, layers[i - 1], layers[i]);
  }
  for (let i = n - 1; i > 0; --i) {
    greedySwitch(g, layers[i - 1], layers[i], true);
  }

  for (let i = 0; i < layers.length; ++i) {
    const layer = layers[i];
    for (let j = 0; j < layer.length; ++j) {
      const u = layer[j];
      g.vertex(u).order = j;
    }
  }

  fixType2Conflicts(g, layers);
};

module.exports = crossingReduction;
