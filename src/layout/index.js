'use strict';

const cycleRemoval = require('./cycle-removal'),
      layerAssignment = require('./layering'),
      normalize = require('./normalize'),
      crossingReduction = require('./crossing-reduction'),
      positionAssignment = require('./position-assignment');

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
  const positions = positionAssignment(g, layers, sizes, xMargin, yMargin, edgeMargin);
  normalizePositions(g, sizes, positions);
  return positions;
};

module.exports = layout;
