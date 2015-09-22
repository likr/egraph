'use strict';

import Graph from './';

const copy = (g) => {
  const newGraph = new Graph();
  for (const u of g.vertices()) {
    newGraph.addVertex(u, g.vertex(u));
  }
  for (const [u, v] of g.edges()) {
    newGraph.addEdge(u, v, g.edge(u, v));
  }
  return newGraph;
};

export default copy;
