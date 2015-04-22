'use strict';

const layerEdges = function* (g, h1, h2) {
  for (const v of h2) {
    for (const u of g.inVertices(v)) {
      yield [u, v];
    }
  }
};

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

const markConflicts = (g, layers) => {
  const h = layers.length - 2;

  for (let i = 1; i < h; ++i) {
    for (const [u1, v1] of layerEdges(g, layers[i], layers[i + 1])) {
      const dummy1 = g.vertex(u1).dummy && g.vertex(v1).dummy;
      for (const [u2, v2] of crossingEdges(g, layers[i], layers[i + 1], u1, v1)) {
        const dummy2 = g.vertex(u2).dummy && g.vertex(v2).dummy;
        if (dummy1 && dummy2) {
          // edge 1 has a type 2 conflict
          g.edge(u1, v1).type2Conflict = true;
        } else if (!dummy1 && dummy2) {
          // edge 1 has a type 1 conflict
          g.edge(u1, v1).type1Conflict = true;
        } else if (dummy1 && !dummy2) {
          // edge 2 has a type 1 conflict
          g.edge(u2, v2).type1Conflict = true;
        }
      }
    }
  }
};

module.exports = markConflicts;
