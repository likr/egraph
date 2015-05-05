'use strict';

import cycleEdges from './cycle-edges';

const cycleRemoval = (g) => {
  for (const [u, v] of cycleEdges(g)) {
    var obj = g.edge(u, v);
    g.removeEdge(u, v);
    g.addEdge(v, u, obj);
  }
};

class CycleRemoval {
  call(g) {
    cycleRemoval(g);
  }
}

export default CycleRemoval;
