'use strict';

import expect from 'expect.js';
import Graph from '../../../../src/graph';
import baryCenter from '../../../../src/layouter/sugiyama/crossing-reduction/bary-center';

describe('baryCenter(g, h1, h2)', () => {
  it('sorts h2', () => {
    const [u1, u2, u3, u4] = [0, 1, 2, 3],
      [v1, v2, v3] = [4, 5, 6];
    const graph = new Graph()
      .addVertex(u1)
      .addVertex(u2)
      .addVertex(u3)
      .addVertex(u4)
      .addVertex(v1)
      .addVertex(v2)
      .addVertex(v3)
      .addEdge(u1, v2)
      .addEdge(u2, v2)
      .addEdge(u2, v3)
      .addEdge(u3, v1)
      .addEdge(u3, v3)
      .addEdge(u4, v2);
    const h1 = [u1, u2, u3, u4],
      h2 = [v1, v2, v3];
    baryCenter(graph, h1, h2);
    expect(h2).to.be.eql([v2, v3, v1]);
  });
});

describe('baryCenter(g, h1, h2, true)', () => {
  it('sorts h1', () => {
    const [u1, u2, u3, u4] = [0, 1, 2, 3],
      [v1, v2, v3] = [4, 5, 6];
    const graph = new Graph()
      .addVertex(u1)
      .addVertex(u2)
      .addVertex(u3)
      .addVertex(u4)
      .addVertex(v1)
      .addVertex(v2)
      .addVertex(v3)
      .addEdge(u1, v2)
      .addEdge(u2, v2)
      .addEdge(u2, v3)
      .addEdge(u3, v1)
      .addEdge(u3, v3)
      .addEdge(u4, v2);
    const h1 = [u1, u2, u3, u4],
      h2 = [v1, v2, v3];
    baryCenter(graph, h1, h2, true);
    expect(h1).to.be.eql([u1, u3, u4, u2]);
  });
});
