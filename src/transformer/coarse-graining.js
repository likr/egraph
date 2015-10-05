import accessor from '../utils/accessor';

const transform = (g, vertexVisibility, edgeVisibility) => {
  for (const [u, v] of g.edges()) {
    const ud = g.vertex(u),
          vd = g.vertex(v),
          d = g.edge(u, v);
    if (!edgeVisibility({u, v, ud, vd, d})) {
      g.removeEdge(u, v);
    }
  }

  for (const u of g.vertices()) {
    if (!vertexVisibility({u, d: g.vertex(u)})) {
      for (const v of g.inVertices(u)) {
        for (const w of g.outVertices(u)) {
          if (!g.edge(u, v)) {
            g.addEdge(v, w);
          }
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

  vertexVisibility() {
    return accessor(this, privates, 'vertexVisibility', arguments);
  }

  edgeVisibility() {
    return accessor(this, privates, 'edgeVisibility', arguments);
  }
}

export default CoarseGrainingTransformer;
