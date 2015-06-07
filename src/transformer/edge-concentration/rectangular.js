const layerDegree = (g, h1, h2) => {
  const us = new Set(h1),
        degree = {};
  for (const v of h2) {
    let val = 0;
    for (const u of g.inVertices(v)) {
      if (us.has(u)) {
        val += 1;
      }
    }
    degree[v] = val;
  }
  return degree;
};

const rectangular = (g, h1, h2) => {
  const k = g.numEdges(),
        active = {},
        degree = layerDegree(g, h1, h2),
        isActive = (u) => active[u],
        cmp = (v1, v2) => degree[v2] - degree[v1];
  h2 = Array.from(h2);

  const concentrations = [];
  let jOffset = 0;
  for (let l = 0; l < k; ++l) {
    for (const u of h1) {
      active[u] = true;
    }

    h2.sort(cmp);
    if (degree[h2[jOffset]] === 0) {
      break;
    }

    let maxEdges = 0,
        maxH1,
        maxH2,
        tmpH2 = [],
        h = 1;
    for (let j = jOffset; j < h2.length; ++j) {
      const v = h2[j];
      let count = 0;
      for (const u of h1) {
        if (active[u]) {
          if (g.edge(u, v)) {
            count += 1;
          } else {
            active[u] = false;
          }
        }
      }
      tmpH2.push(v);
      if (count * h > maxEdges) {
        maxEdges = count * h;
        maxH1 = h1.filter(isActive);
        maxH2 = Array.from(tmpH2);
      }
      h += 1;
    }

    if (maxH1.length > 1 && maxH2.length > 1) {
      for (const v of maxH2) {
        degree[v] -= maxH1.length;
      }
      concentrations.push({
        source: Array.from(maxH1),
        target: Array.from(maxH2)
      });
      jOffset = 0;
    } else {
      jOffset += 1;
    }

    if (jOffset >= h2.length) {
      break;
    }
  }

  return concentrations;
};

export default rectangular;
