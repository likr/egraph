'use strict';

const newman = (g) => {
  const n = g.numVertices(),
        m = g.numEdges(),
        vertices = g.vertices(),
        ck = new Array(n),
        nb = new Array(n * n),
        mask = new Array(n),
        communities = new Array(n),
        result = {};

  for (let i = 0; i < n; ++i) {
    const u = vertices[i];
    communities[i] = i;
    ck[i] = g.inDegree(u) + g.outDegree(u);
    mask[i] = false;
    for (let j = 0; j < n; ++j) {
      const v = vertices[j];
      nb[i * n + j] = g.edge(v, u) || g.edge(u, v) ? 1 : 0;
    }
  }

  let qMax = -Infinity,
      q = 0;
  for (let nc = n; nc > 1; --nc) {
    let deltaQMax = -Infinity,
        fromIndex, toIndex;
    for (let i = 0; i < n; ++i) {
      if (mask[i]) {
        continue;
      }
      for (let j = i + 1; j < n; ++j) {
        if (mask[j]) {
          continue;
        }
        const deltaQ = (nb[i * n + j] - ck[i] * ck[j] / 2 / m) / m;
        if (deltaQ > deltaQMax) {
          deltaQMax = deltaQ;
          toIndex = i;
          fromIndex = j;
        }
      }
    }
    ck[toIndex] += ck[fromIndex] + nb[toIndex * n + fromIndex];
    for (let i = 0; i < n; ++i) {
      nb[toIndex * n + i] += nb[fromIndex * n + i];
      nb[i * n + toIndex] += nb[i * n + fromIndex];
      if (communities[i] === fromIndex) {
        communities[i] = toIndex;
      }
    }
    mask[fromIndex] = true;

    q += deltaQMax;
    if (q > qMax) {
      qMax = q;
      for (let i = 0; i < n; ++i) {
        const u = vertices[i];
        result[u] = communities[i];
      }
    }
  }

  return result;
};

module.exports = newman;
