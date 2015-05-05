'use strict';

import expect from 'expect.js';
import Graph from '../../src/graph';
import normalize from '../../src/layout/normalize';

describe('normalize(g, layers, layerMap, edgeMargin)', () => {
  it('inserts dummy vertices and edges', () => {
    const graph = new Graph();
    const a = graph.addVertex({layer: 0});
    const b = graph.addVertex({layer: 1});
    const c = graph.addVertex({layer: 2});
    graph.addEdge(a, b);
    graph.addEdge(b, c);
    graph.addEdge(a, c);
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
