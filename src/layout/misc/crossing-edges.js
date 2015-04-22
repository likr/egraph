'use strict';

const crossingEdges = function* (g, h1, h2, u, v) {
  for (let j = g.vertex(v).order + 1; j < h2.length; ++j) {
    const v = h2[j];
    for (let i = g.vertex(u).order - 1; i >= 0; --i) {
      const u = h1[i];
      if (g.edge(u, v)) {
        yield [u, v];
      }
    }
  }
};

module.exports = crossingEdges;
