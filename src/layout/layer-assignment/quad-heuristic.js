'use strict';

const longestPath = require('./longest-path');

const quadHeuristic = (g) => {
  longestPath(g);

  let minLayer = Infinity,
      maxLayer = -Infinity;
  for (const u of g.vertices()) {
    minLayer = Math.min(minLayer, g.vertex(u).layer);
    maxLayer = Math.max(maxLayer, g.vertex(u).layer);
  }
  for (const u of g.vertices()) {
    if (g.inDegree(u) === 0) {
      g.vertex(u).layer = 0;
    } else {
      g.vertex(u).layer -= minLayer;
    }
  }

  const repeat = 4,
        vertices = g.vertices().filter(u => g.inDegree(u) > 0 && g.outDegree(u) > 0),
        weights = {},
        cmp = (u, v) => weights[v] - weights[u];
  for (let loop = 0; loop < repeat; ++loop) {
    for (const u of g.vertices()) {
      weights[u] = 0;
    }
    for (const [u, v] of g.edges()) {
      const l = g.vertex(v).layer - g.vertex(u).layer;
      weights[u] += l;
      weights[v] += l;
    }

    vertices.sort(cmp);
    for (const u of vertices) {
      let sum = 0,
          count = 0,
          leftMax = -Infinity,
          rightMin = Infinity;
      for (const v of g.inVertices(u)) {
        const layer = g.vertex(v).layer;
        leftMax = Math.max(leftMax, layer);
        sum += layer;
        count += 1;
      }
      for (const v of g.outVertices(u)) {
        const layer = g.vertex(v).layer;
        rightMin = Math.min(rightMin, layer);
        sum += layer;
        count += 1;
      }
      g.vertex(u).layer = Math.min(rightMin - 1, Math.max(leftMax + 1, Math.round(sum / count)));
    }
  }
};

module.exports = quadHeuristic;
