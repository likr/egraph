'use strict';

const threeLayerBaryCenter = (g, h1, h2, h3) => {
  const centers = {};
  for (let v of h2) {
    let sum = 0,
        count = 0;
    for (let i = 0; i < h1.length; ++i) {
      let u = h1[i];
      if (g.edge(u, v)) {
        sum += i;
        count += 1;
      }
    }
    for (let i = 0; i < h3.length; ++i) {
      let w = h1[i];
      if (g.edge(v, w)) {
        sum += i;
        count += 1;
      }
    }
    centers[v] = sum / count;
  }
  h2.sort((u, v) => {
    return centers[u] - centers[v];
  });
};

export default threeLayerBaryCenter;
