'use strict';

import accessor from '../../utils/accessor';
import cycleRemoval from '../../layouter/sugiyama/cycle-removal';
import layerAssignment from '../../layouter/sugiyama/layer-assignment';
import rectangular from './rectangular';

const edgeConcentration = (g, h1, h2, method, dummy) => {
  for (const concentration of method(g, h1, h2)) {
    const w = g.nextVertexId();
    g.addVertex(w, dummy());
    for (const u of concentration.source) {
      g.addEdge(u, w);
    }
    for (const v of concentration.target) {
      g.addEdge(w, v);
    }
    for (const u of g.inVertices(w)) {
      for (const v of g.outVertices(w)) {
        if (g.edge(u, v)) {
          g.removeEdge(u, v);
        }
      }
    }
  }
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
      method: rectangular,
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
      edgeConcentration(g, h1, Array.from(h2.values()), this.method(), this.dummy());
    }
    return g;
  }

  cycleRemoval(arg) {
    return accessor(this, privates, 'cycleRemoval', arguments);
  }

  layerAssignment(arg) {
    return accessor(this, privates, 'layerAssignment', arguments);
  }

  method(arg) {
    return accessor(this, privates, 'method', arguments);
  }

  dummy(arg) {
    return accessor(this, privates, 'dummy', arguments);
  }
}

export default EdgeConcentrationTransformer;
