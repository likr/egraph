'use strict';

import expect from 'expect.js';
import Graph from '../../../../src/graph';
import crossingMatrix from '../../../../src/layouter/sugiyama/crossing-reduction/crossing-matrix';

describe('crossingMatrix(g, h1, h2)', () => {
  it('returns crossing matrix', () => {
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
