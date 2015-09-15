'use strict';

import expect from 'expect.js';
import Graph from '../../../src/graph';
import normalize from '../../../src/layouter/sugiyama/normalize';

describe('normalize(g, layers, layerMap, edgeMargin)', () => {
  it('inserts dummy vertices and edges', () => {
    const a = 0, b = 1, c = 2;
    const graph = new Graph()
      .addVertex(a, {layer: 0})
      .addVertex(b, {layer: 1})
      .addVertex(c, {layer: 2})
      .addEdge(a, b)
      .addEdge(b, c)
      .addEdge(a, c);
    const layers = [[a], [b], [c]],
          layerMap = {
            [a]: 0,
            [b]: 1,
            [c]: 2
          };
    normalize(graph, layers, layerMap, 5);
    expect(graph.numVertices()).to.be(4);
    expect(graph.numEdges()).to.be(4);
    expect(graph.vertex(3).dummy).to.be.ok();
    expect(graph.edge(a, 3).dummy).to.be.ok();
    expect(graph.edge(3, c).dummy).to.be.ok();
    expect(layers).to.be.eql([[a], [b, 3], [c]]);
  });
});
