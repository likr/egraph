const layerVertices = (g, h1, h2) => {
  const us = new Set(h1),
        vertices = {};
  for (const v of h2) {
    vertices[v] = new Set();
    for (const u of g.inVertices(v)) {
      if (us.has(u)) {
        vertices[v].add(u);
      }
    }
  }
  return vertices;
};

const rectangular = (g, h1, h2) => {
  const k = g.numEdges(),
        active = {},
        vertices = layerVertices(g, h1, h2),
        isActive = (u) => active[u],
        cmp = (v1, v2) => vertices[v2].size - vertices[v1].size,
        d = (s, t) => {
          let count = 0;
          for (const u of s) {
            for (const v of t) {
              if (vertices[v].has(u)) {
                count += 1;
              }
            }
          }
          return count - s.length - t.length;
        };
  h2 = Array.from(h2);

  const concentrations = [];
  let jOffset = 0;
  for (let l = 0; l < k; ++l) {
    for (const u of h1) {
      active[u] = true;
    }

    h2.sort(cmp);
    if (vertices[h2[jOffset]].size <= 0) {
      break;
    }

    let maxD = -1,
        maxH1,
        maxH2,
        tmpH2 = [];
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
      let tmpH1 = h1.filter(isActive),
          tmpD = d(tmpH1, tmpH2);
      if (tmpD > maxD) {
        maxD = tmpD;
        maxH1 = tmpH1;
        maxH2 = Array.from(tmpH2);
      }
    }

    if (maxD > -1) {
      for (const v of maxH2) {
        for (const u of maxH1) {
          vertices[v].delete(u);
        }
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
