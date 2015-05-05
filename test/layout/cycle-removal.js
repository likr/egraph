'use strict';

import expect from 'expect.js';
import Graph from '../../src/graph';
import cycleRemoval from '../../src/layout/cycle-removal';
import cycleEdges from '../../src/layout/cycle-removal/cycle-edges';

describe('cycleEdges(g)', () => {
  it('returns cycle edges of g', () => {
    const graph = new Graph();
    const a = graph.addVertex();
    const b = graph.addVertex();
    const c = graph.addVertex();
    graph.addEdge(a, b);
    graph.addEdge(b, c);
    graph.addEdge(c, a);
    const edges = cycleEdges(graph);
    expect(edges.length).to.be(1);
    expect(edges[0][0]).to.be(c);
    expect(edges[0][1]).to.be(a);
  });
});

describe('cycleRemoval(g)', () => {
  it('replace cycle edges with the inverse edges', () => {
    var graph = new Graph();
    var a = graph.addVertex();
    var b = graph.addVertex();
    var c = graph.addVertex();
    graph.addEdge(a, b);
    graph.addEdge(b, c);
    graph.addEdge(c, a);
    cycleRemoval(graph);
    expect(graph.edge(a, c)).to.be.ok();
  });
});
