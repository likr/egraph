'use strict';

import expect from 'expect.js';
import Graph from '../../../../src/graph';
import crossingMatrix from '../../../../src/layouter/sugiyama/crossing-reduction/crossing-matrix';

describe('crossingMatrix(g, h1, h2)', () => {
  it('returns crossing matrix', () => {
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
    const h1 = [u1, u2, u3, u4];
    const h2 = [v1, v2, v3];
    const result = crossingMatrix(graph, h1, h2);
    expect(result[0]).to.be(0);
    expect(result[1]).to.be(2);
    expect(result[2]).to.be(1);
    expect(result[3]).to.be(1);
    expect(result[4]).to.be(0);
    expect(result[5]).to.be(2);
    expect(result[6]).to.be(0);
    expect(result[7]).to.be(3);
    expect(result[8]).to.be(0);
  });
});
