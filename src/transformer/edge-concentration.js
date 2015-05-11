'use strict';

import copy from '../graph/copy';
import accessor from '../utils/accessor';
import cycleRemoval from '../layouter/sugiyama/cycle-removal';
import layerAssignment from '../layouter/sugiyama/layer-assignment';

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

const edgeConcentration = (g, h1, h2, k, dummy) => {
  const active = {},
        degree = layerDegree(g, h1, h2),
        isActive = (u) => active[u],
        cmp = (v1, v2) => degree[v2] - degree[v1];
  h2 = Array.from(h2);

  const m = [];
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
      const w = g.addVertex(dummy());
      for (const u of maxH1) {
        for (const v of maxH2) {
          g.removeEdge(u, v);
        }
      }
      for (const u of maxH1) {
        g.addEdge(u, w);
      }
      for (const v of maxH2) {
        g.addEdge(w, v);
        degree[v] -= maxH1.length;
      }
      m.push(w);
      jOffset = 0;
    } else {
      jOffset += 1;
    }

    if (jOffset >= h2.length) {
      break;
    }
  }

  return m;
};

const groupLayers = (g, layers) => {
  const result = [];
  for (const u of g.vertices()) {
    const layer = layers[u];
    if (result[layer] === undefined) {
      result[layer] = [];
    }
    result[layer].push(u);
  }
  return result;
};

const privates = new WeakMap();

class EdgeConcentrationTransformer {
  constructor() {
    privates.set(this, {
      cycleRemoval: new cycleRemoval.CycleRemoval(),
      layerAssignment: new layerAssignment.QuadHeuristic(),
      dummy: () => ({dummy: true})
    });
  }

  transform(g) {
    this.cycleRemoval().call(g);
    const layerMap = this.layerAssignment().call(g);
    const layers = groupLayers(g, layerMap);
    for (let i = 0; i < layers.length - 1; ++i) {
      const h1 = layers[i],
            h2 = new Set();
      let edges = 0;
      for (const u of h1) {
        for (const v of g.outVertices(u)) {
          h2.add(v);
          edges += 1;
        }
      }
      edgeConcentration(g, h1, Array.from(h2.values()), (edges / 4).toFixed(), this.dummy());
    }
    return g;
  }

  cycleRemoval(arg) {
    return accessor(this, privates, 'cycleRemoval', arguments);
  }

  layerAssignment(arg) {
    return accessor(this, privates, 'layerAssignment', arguments);
  }

  dummy(arg) {
    return accessor(this, privates, 'dummy', arguments);
  }
}

export default EdgeConcentrationTransformer;
