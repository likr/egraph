'use strict';

import copy from '../graph/copy';

const transform = (g) => {
  const vertices = g.vertices(),
        n = vertices.length,
        a = new Int32Array(n * n);
  for (let i = 0; i < n; ++i) {
    const u = vertices[i];
    for (let j = 0; j < n; ++j) {
      const v = vertices[j];
      if (g.edge(u, v)) {
        a[i * n + j] = 1;
      } else {
        a[i * n + j] = 0x80000000;
      }
    }
  }
  for (let k = 0; k < n; ++k) {
    for (let i = 0; i < n; ++i) {
      for (let j = 0; j < n; ++j) {
        a[i * n + j] = Math.max(a[i * n + j], a[i * n + k] + a[k * n + j]);
      }
    }
  }
  for (let i = 0; i < n; ++i) {
    const u = vertices[i];
    for (let j = 0; j < n; ++j) {
      const v = vertices[j];
      if (g.edge(u, v) && a[i * n + j] > 1) {
        g.removeEdge(u, v);
      }
    }
  }
};

class IsmTransformer {
  constructor() {
  }

  transform(g) {
    transform(g);
    return g;
  }
}

export default IsmTransformer;
