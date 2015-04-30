'use strict';

import cycleEdges from './cycle-edges';

const cycleRemoval = function (g) {
  for (let [u, v] of cycleEdges(g)) {
    var obj = g.edge(u, v);
    g.removeEdge(u, v);
    g.addEdge(v, u, obj);
  }
};

export default cycleRemoval;
