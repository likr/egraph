'use strict';
module.exports = function normalize(g, layers) {
  var i, w1, w2;
  for (let [u, v] of g.edges()) {
    if (layers[v] - layers[u] > 1) {
      w1 = u;
      for (i = layers[u] + 1; i < layers[v]; ++i) {
        w2 = g.addVertex({
          dummy: true
        });
        g.addEdge(w1, w2, {
          dummy: true
        });
        layers[w2] = i;
        w1 = w2;
      }
      g.addEdge(w1, v, {
        dummy: true
      });
      g.removeEdge(u, v);
    }
  }
};
