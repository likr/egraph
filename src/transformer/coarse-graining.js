'use strict';

import Graph from '../graph';
import accessor from '../utils/accessor';

const transform = (gOrig, vertexVisibility, edgeVisibility) => {
  const g = new Graph();

  for (const u of gOrig.vertices()) {
    g.addVertex(u, gOrig.vertex(u));
  }
  for (const [u, v] of gOrig.edges()) {
    const ud = gOrig.vertex(u),
          vd = gOrig.vertex(v),
          d = gOrig.edge(u, v);
    if (edgeVisibility({u, v, ud, vd, d})) {
      g.addEdge(u, v, gOrig.edge(u, v));
    }
  }

  for (const u of g.vertices()) {
    if (!vertexVisibility({u, d: g.vertex(u)})) {
      for (const v of g.inVertices(u)) {
        for (const w of g.outVertices(u)) {
          g.addEdge(v, w);
        }
      }
      g.removeVertex(u);
    }
  }

  return g;
};

const privates = new WeakMap();

class CoarseGrainingTransformer {
  constructor() {
    privates.set(this, {
      vertexVisibility: () => true,
      edgeVisibility: () => true
    });
  }

  transform(g) {
    return transform(g, this.vertexVisibility(), this.edgeVisibility());
  }

  vertexVisibility(arg) {
    return accessor(this, privates, 'vertexVisibility', arguments);
  }

  edgeVisibility(arg) {
    return accessor(this, privates, 'edgeVisibility', arguments);
  }
}

export default CoarseGrainingTransformer;
