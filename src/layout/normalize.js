'use strict';

const normalize = function (g, layers, edgeMargin) {
  var i, w1, w2;
  for (let [u, v] of g.edges()) {
    if (g.vertex(v).layer - g.vertex(u).layer > 1) {
      w1 = u;
      for (i = g.vertex(u).layer + 1; i < g.vertex(v).layer; ++i) {
        w2 = g.addVertex({
          dummy: true,
          width: edgeMargin,
          height: 0,
          layer: i
        });
        g.addEdge(w1, w2, {
          dummy: true
        });
        layers[i].push(w2);
        w1 = w2;
      }
      g.addEdge(w1, v, {
        dummy: true
      });
      g.removeEdge(u, v);
    }
  }
};

export default normalize;
