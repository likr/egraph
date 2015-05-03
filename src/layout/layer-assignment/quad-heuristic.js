'use strict';

import LongestPath from './longest-path';
import defineAccessors from '../../utils/define-accessors';

const quadHeuristic = (g, repeat) => {
  const layers = new LongestPath().call(g);

  let minLayer = Infinity,
      maxLayer = -Infinity;
  for (const u of g.vertices()) {
    minLayer = Math.min(minLayer, layers[u]);
    maxLayer = Math.max(maxLayer, layers[u]);
  }
  for (const u of g.vertices()) {
    if (g.inDegree(u) === 0) {
      layers[u] = 0;
    } else {
      layers[u] -= minLayer;
    }
  }

  const vertices = g.vertices().filter(u => g.inDegree(u) > 0 && g.outDegree(u) > 0),
        weights = {},
        cmp = (u, v) => weights[v] - weights[u];
  for (let loop = 0; loop < repeat; ++loop) {
    for (const u of g.vertices()) {
      weights[u] = 0;
    }
    for (const [u, v] of g.edges()) {
      const l = layers[v] - layers[u];
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
        const layer = layers[v];
        leftMax = Math.max(leftMax, layer);
        sum += layer;
        count += 1;
      }
      for (const v of g.outVertices(u)) {
        const layer = layers[v];
        rightMin = Math.min(rightMin, layer);
        sum += layer;
        count += 1;
      }
      layers[u] = Math.min(rightMin - 1, Math.max(leftMax + 1, Math.round(sum / count)));
    }
  }

  return layers;
};

class QuadHeuristic {
  constructor() {
    defineAccessors(this, {}, {
      repeat: 4
    });
  }

  call(g) {
    return quadHeuristic(g, this.repeat());
  }
}

export default QuadHeuristic;
