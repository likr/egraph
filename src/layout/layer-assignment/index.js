'use strict';

import quadHeuristic from './quad-heuristic';

const group = (g) => {
  const result = [];
  for (const u of g.vertices()) {
    const layer = g.vertex(u).layer;
    if (result[layer] === undefined) {
      result[layer] = [];
    }
    result[layer].push(u);
  }
  return result;
};

const layerAssignment = (g) => {
  quadHeuristic(g);

  let minLayer = Infinity;
  for (const u of g.vertices()) {
    minLayer = Math.min(minLayer, g.vertex(u).layer);
  }
  for (const u of g.vertices()) {
    g.vertex(u).layer -= minLayer;
  }

  return group(g);
};

export default layerAssignment;
