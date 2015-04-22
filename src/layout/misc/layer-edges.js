'use strict';

const layerEdges = function* (g, h1, h2) {
  for (const v of h2) {
    for (const u of g.inVertices(v)) {
      yield [u, v];
    }
  }
};

module.exports = layerEdges;
