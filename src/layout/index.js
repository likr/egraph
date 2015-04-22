'use strict';

const cycleRemoval = require('./cycle-removal'),
      layerAssignment = require('./layering'),
      normalize = require('./normalize'),
      crossingReduction = require('./crossing-reduction'),
      positionAssignment = require('./position-assignment'),
      layerEdges = require('./misc/layer-edges'),
      crossingEdges = require('./misc/crossing-edges');

const setOrder = (g, layers) => {
  for (let i = 0; i < layers.length; ++i) {
    const layer = layers[i];
    for (let j = 0; j < layer.length; ++j) {
      const u = layer[j];
      g.vertex(u).layer = i;
      g.vertex(u).order = j;
    }
  }
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

const normalizePositions = (g, sizes, positions) => {
  let xMin = Infinity,
      yMin = Infinity;
  for (const u of g.vertices()) {
    xMin = Math.min(xMin, positions[u].x - sizes[u].width / 2);
    yMin = Math.min(yMin, positions[u].y - sizes[u].height / 2);
  }
  for (const u of g.vertices()) {
    positions[u].x -= xMin;
    positions[u].y -= yMin;
  }
};

const layout = (g, sizes, {xMargin=10, yMargin=10, edgeMargin=5}) => {
  cycleRemoval(g);
  const ranks = layerAssignment(g);
  normalize(g, ranks);
  const layers = [];
  for (const u of g.vertices()) {
    const rank = ranks[u];
    if (layers[rank] === undefined) {
      layers[rank] = [];
    }
    layers[rank].push(u);
    if (g.vertex(u).dummy) {
      sizes[u] = {
        width: 0,
        height: 0
      };
    }
  }
  crossingReduction(g, layers);
  setOrder(g, layers);
  fixType2Conflicts(g, layers);
  positionAssignment(g, layers, sizes, xMargin, yMargin, edgeMargin);
  const positions = {};
  for (const u of g.vertices()) {
    positions[u] = {
      x: g.vertex(u).x,
      y: g.vertex(u).y
    };
  }
  normalizePositions(g, sizes, positions);
  return positions;
};

module.exports = layout;
