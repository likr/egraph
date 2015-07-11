'use strict';

const normalize = function (g, layers, layerMap, edgeMargin) {
  var i, w1, w2;
  for (let [u, v] of g.edges()) {
    const d = g.edge(u, v);
    if (layerMap[v] - layerMap[u] > 1) {
      w1 = u;
      for (i = layerMap[u] + 1; i < layerMap[v]; ++i) {
        w2 = g.addVertex({
          dummy: true,
          width: d.width + edgeMargin,
          origWidth: d.width + edgeMargin,
          height: 0,
          origHeight: 0,
          layer: i
        });
        g.addEdge(w1, w2, {
          dummy: true,
          reversed: g.edge(u, v).reversed,
          width: d.width
        });
        layers[i].push(w2);
        w1 = w2;
      }
      g.addEdge(w1, v, {
        dummy: true,
        reversed: g.edge(u, v).reversed,
        width: d.width
      });
      g.removeEdge(u, v);
    }
  }
};

export default normalize;
