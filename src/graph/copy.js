'use strict';

import Graph from './';

const copy = (g) => {
  const idOffset = Math.max(...g.vertices()) + 1;
  const newGraph = new Graph(idOffset);
  for (const u of g.vertices()) {
    newGraph.addVertex(u, g.vertex(u));
  }
  for (const [u, v] of g.edges()) {
    newGraph.addEdge(u, v, g.edge(u, v));
  }
  return newGraph;
};

export default copy;
