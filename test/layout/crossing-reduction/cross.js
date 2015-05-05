'use strict';

import expect from 'expect.js';
import Graph from '../../../src/graph';
import cross from '../../../src/layout/crossing-reduction/cross';

describe('cross(g, h1, h2)', () => {
  it('returns the number of crossing', () => {
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
    expect(cross(graph, [u1, u2, u3, u4], [v1, v2, v3])).to.be(5);
  });
});
