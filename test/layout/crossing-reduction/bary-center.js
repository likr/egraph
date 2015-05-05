'use strict';

import expect from 'expect.js';
import Graph from '../../../src/graph';
import baryCenter from '../../../src/layout/crossing-reduction/bary-center';

describe('baryCenter(g, h1, h2)', () => {
  it('sorts h2', () => {
    const graph = new Graph();
    const u1 = graph.addVertex();
    const u2 = graph.addVertex();
    const u3 = graph.addVertex();
    const u4 = graph.addVertex();
    const v1 = graph.addVertex();
    const v2 = graph.addVertex();
    const v3 = graph.addVertex();
    graph.addEdge(u1, v2);
    graph.addEdge(u2, v2);
    graph.addEdge(u2, v3);
    graph.addEdge(u3, v1);
    graph.addEdge(u3, v3);
    graph.addEdge(u4, v2);
    let h1 = [u1, u2, u3, u4],
        h2 = [v1, v2, v3];
    baryCenter(graph, h1, h2);
    expect(h2).to.be.eql([v2, v3, v1]);
  });
});

describe('baryCenter(g, h1, h2, true)', () => {
  it('sorts h1', () => {
    const graph = new Graph();
    const u1 = graph.addVertex();
    const u2 = graph.addVertex();
    const u3 = graph.addVertex();
    const u4 = graph.addVertex();
    const v1 = graph.addVertex();
    const v2 = graph.addVertex();
    const v3 = graph.addVertex();
    graph.addEdge(u1, v2);
    graph.addEdge(u2, v2);
    graph.addEdge(u2, v3);
    graph.addEdge(u3, v1);
    graph.addEdge(u3, v3);
    graph.addEdge(u4, v2);
    let h1 = [u1, u2, u3, u4],
        h2 = [v1, v2, v3];
    baryCenter(graph, h1, h2, true);
    expect(h1).to.be.eql([u1, u3, u4, u2]);
  });
});
