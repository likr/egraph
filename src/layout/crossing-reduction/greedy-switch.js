'use strict';

const greedySwitch = (g, h1, h2, inverse=false) => {
  const hasEdge = inverse ? (u, v) => g.edge(v, u) : (u, v) => g.edge(u, v);
  [h1, h2] = inverse ? [h2, h1] : [h1, h2];

  const c = (v1, v2) => {
    let count = 0;
    for (let i = 0; i < h1.length; ++i) {
      const u2 = h1[i];
      if (hasEdge(u2, v2)) {
        for (let j = i + 1; j < h1.length; ++j) {
          const u1 = h1[j];
          if (hasEdge(u1, v1)) {
            count += 1;
          }
        }
      }
    }
    return count;
  };

  for (let i = 1; i < h2.length; ++i) {
    const v1 = h2[i - 1],
          v2 = h2[i];
    if (c(v1, v2) > c(v2, v1)) {
      [h2[i - 1], h2[i]] = [v2, v1];
    }
  }
};

module.exports = greedySwitch;
