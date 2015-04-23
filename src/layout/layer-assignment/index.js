'use strict';

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
  const visited = {};

  const dfs = (u) => {
    if (visited[u]) {
      return g.vertex(u).layer;
    }
    visited[u] = true;

    let layer = Infinity;
    for (const v of g.outVertices(u)) {
      layer = Math.min(layer, dfs(v) - 1);
    }
    if (layer === Infinity) {
      layer = 0;
    }
    g.vertex(u).layer = layer;
    return layer;
  };

  for (const u of g.vertices()) {
    if (g.inDegree(u) === 0) {
      dfs(u);
    }
  }

  let minLayer = Infinity;
  for (const u of g.vertices()) {
    minLayer = Math.min(minLayer, g.vertex(u).layer);
  }
  for (const u of g.vertices()) {
    g.vertex(u).layer -= minLayer;
  }

  return group(g);
};

module.exports = layerAssignment;
