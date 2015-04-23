'use strict';

const crossingEdges = (g, h1, h2, u1, v1) => {
  const result = [],
        order = {};
  for (const u of h1) {
    order[u] = g.vertex(u).order;
  }
  for (const u of h2) {
    order[u] = g.vertex(u).order;
  }
  for (let j = order[v1] + 1; j < h2.length; ++j) {
    const v2 = h2[j];
    for (const u2 of g.inVertices(v2)) {
      if (order[u2] < order[u1]) {
        result.push([u2, v2]);
      }
    }
  }
  return result;
};

module.exports = crossingEdges;
