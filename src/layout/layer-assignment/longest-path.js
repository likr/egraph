'use strict';

const longestPath = (g) => {
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
};

module.exports = longestPath;
