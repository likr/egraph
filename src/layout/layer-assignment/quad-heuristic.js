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
  const weights = {};
  for (const u of g.vertices()) {
    weights[u] = 0;
    if (g.inDegree(u) === 0) {
      g.vertex(u).layer = 0;
    } else {
      g.vertex(u).layer -= minLayer;
    }
  }

  for (const [u, v] of g.edges()) {
    const l = g.vertex(v).layer - g.vertex(u).layer;
    weights[u] += l * l;
    weights[v] += l * l;
  }

  const vertices = new Set(g.vertices().filter(u => g.inDegree(u) > 0 && g.outDegree(u) > 0));
  for (let i = 0; i < vertices.size; ++i) {
    let maxWeight = 0,
        u;
    for (const v of vertices) {
      if (weights[v] > maxWeight) {
        maxWeight = weights[v];
        u = v;
      }
    }
    vertices.delete(u);

    const uLayer0 = g.vertex(u).layer;
    let sum = 0,
        count = 0,
        leftMax = -Infinity,
        rightMin = Infinity;
    for (const v of g.inVertices(u)) {
      const layer = g.vertex(v).layer,
            l = uLayer0 - layer;
      leftMax = Math.max(leftMax, layer);
      sum += layer;
      count += 1;
      weights[v] -= l * l;
    }
    for (const v of g.outVertices(u)) {
      const layer = g.vertex(v).layer,
            l = layer - uLayer0;
      rightMin = Math.min(rightMin, layer);
      sum += layer;
      count += 1;
      weights[v] -= l * l;
    }
    const uLayer = g.vertex(u).layer = Math.min(rightMin - 1, Math.max(leftMax + 1, Math.floor(sum / count)));
    for (const v of g.inVertices(u)) {
      const layer = g.vertex(v).layer,
            l = uLayer - layer;
      weights[v] += l * l;
    }
    for (const v of g.outVertices(u)) {
      const layer = g.vertex(v).layer,
            l = layer - uLayer0;
      weights[v] += l * l;
    }
  }

};

module.exports = quadHeuristic;
