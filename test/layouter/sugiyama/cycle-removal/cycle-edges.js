'use strict';

import expect from 'expect.js';
import Graph from '../../../../src/graph';
import cycleEdges from '../../../../src/layouter/sugiyama/cycle-removal/cycle-edges';

describe('cycleEdges(g)', () => {
  it('returns cycle edges of g', () => {
    const [a, b, c] = [0, 1, 2];
    const graph = new Graph()
      .addVertex(a)
      .addVertex(b)
      .addVertex(c)
      .addEdge(a, b)
      .addEdge(b, c)
      .addEdge(c, a);
    const edges = cycleEdges(graph);
    expect(edges.length).to.be(1);
    expect(edges[0][0]).to.be(c);
    expect(edges[0][1]).to.be(a);
  });
});
