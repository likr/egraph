'use strict';

import layerMatrix from '../misc/layer-matrix';

const fixType2Conflicts = (g, layers) => {
  const dummy = {},
        order = {};

  for (const u of g.vertices()) {
    const node = g.vertex(u);
    dummy[u] = node.dummy;
    order[u] = node.order;
  }

  for (let i = 1; i < layers.length; ++i) {
    const h1 = layers[i - 1],
          h2 = layers[i],
          n = h1.length,
          m = h2.length,
          a = layerMatrix(g, h1, h2);
    for (let j2 = 0; j2 < m - 1; ++j2) {
      const v2 = h2[j2];
      if (!dummy[v2]) {
        continue;
      }
      for (let j1 = j2 + 1; j1 < m; ++j1) {
        const v1 = h2[j1];
        if (!dummy[v1]) {
          continue;
        }
        for (let i2 = n - 1; i2 > 0; --i2) {
          const i1 = i2 - 1,
                u1 = h1[i1],
                u2 = h1[i2];
          if (dummy[u1] && dummy[u2] && a[i1 * m + j1] && a[i2 * m + j2]) {
            h2[j1] = v2;
            h2[j2] = v1;
            order[v1] = j2;
            order[v2] = i1;
          }
        }
      }
    }
  }

  for (const u of g.vertices()) {
    g.vertex(u).order = order[u];
  }
};

export default fixType2Conflicts;
