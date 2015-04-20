'use strict';

const cycleRemoval = require('./cycle-removal'),
      layerAssignment = require('./layering'),
      normalize = require('./normalize'),
      crossingReduction = require('./crossing-reduction'),
      positionAssignment = require('./position-assignment');

const layout = (g, sizes, {xMargin=10, yMargin=10}) => {
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
  const descDegree = (u, v) => (g.inDegree(u) + g.outDegree(u) - (g.inDegree(v) + g.outDegree(v)));
  for (const layer of layers) {
    layer.sort(descDegree);
  }
  const positions = positionAssignment(g, layers, sizes, xMargin, yMargin);
  return positions;
};

module.exports = layout;
