'use strict';

import layerEdges from '../../misc/layer-edges';
import crossingEdges from '../../misc/crossing-edges';

const markConflicts = (g, layers) => {
  const h = layers.length - 2;

  for (let i = 1; i < h; ++i) {
    for (const [u1, v1] of layerEdges(g, layers[i], layers[i + 1])) {
      const dummy1 = g.vertex(u1).dummy && g.vertex(v1).dummy;
      for (const [u2, v2] of crossingEdges(g, layers[i], layers[i + 1], u1, v1)) {
        const dummy2 = g.vertex(u2).dummy && g.vertex(v2).dummy;
        if (!dummy1 && dummy2) {
          // edge 1 has a type 1 conflict
          g.edge(u1, v1).type1Conflict = true;
        } else if (dummy1 && !dummy2) {
          // edge 2 has a type 1 conflict
          g.edge(u2, v2).type1Conflict = true;
        }
      }
    }
  }
};

export default markConflicts;
