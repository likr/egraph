'use strict';

import median from '../../misc/median';

const verticalAlignment = (g, layers, {rtol=false, btot=false}) => {
  const iterLayers = function* () {
    if (btot) {
      for (let i = layers.length - 2; i >= 0; --i) {
        yield layers[i];
      }
    } else {
      for (let i = 1; i < layers.length; ++i) {
        yield layers[i];
      }
    }
  };

  const iterLayer = function* (layer) {
    if (rtol) {
      for (let i = layer.length - 1; i >= 0; --i) {
        yield layer[i];
      }
    } else {
      for (let i = 0; i < layer.length; ++i) {
        yield layer[i];
      }
    }
  };

  const edge = btot ? (u, v) => g.edge(v, u) : (u, v) => g.edge(u, v),
        degree = btot ? u => g.outDegree(u) : u => g.inDegree(u),
        med = btot ? (g, layers) => median(g, layers, true) : (g, layers) => median(g, layers);
  for (const u of g.vertices()) {
    g.vertex(u).root = u;
    g.vertex(u).align = u;
  }
  for (const layer of iterLayers()) {
    let r = rtol ? Infinity : -Infinity;
    for (const v of iterLayer(layer)) {
      if (degree(v) > 0) {
        const {left, right} = med(g, v);
        const medians = left === right ? [left] : (rtol ? [right, left] : [left, right]);
        for (const u of medians) {
          if (!edge(u, v).type1Conflict && !edge(u, v).type2Conflict) {
            if (rtol ? r > g.vertex(u).order : r < g.vertex(u).order) {
              g.vertex(v).align = g.vertex(v).root = g.vertex(u).root;
              g.vertex(u).align = v;
              r = g.vertex(u).order;
              break;
            }
          }
        }
      }
    }
  }
};

export default verticalAlignment;
