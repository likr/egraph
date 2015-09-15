'use strict';

import expect from 'expect.js';
import Graph from '../../src/graph';
import EdgeConcentrationTransformer from '../../src/transformer/edge-concentration';
import newbery from '../../src/transformer/edge-concentration/newbery';

describe('EdgeConcentrationTransformer', () => {
  describe('transform(g)', () => {
    it('returns transformed graph', () => {
      const u1 = 0, u2 = 1, v1 = 2, v2 = 3, w1 = 4, w2 = 5;
      const graph = new Graph()
        .addVertex(u1)
        .addVertex(u2)
        .addVertex(v1)
        .addVertex(v2)
        .addVertex(w1)
        .addVertex(w2)
        .addEdge(u1, v1)
        .addEdge(u1, v2)
        .addEdge(u1, w1)
        .addEdge(u1, w2)
        .addEdge(u2, v1)
        .addEdge(u2, v2)
        .addEdge(u2, w1)
        .addEdge(u2, w2)
        .addEdge(v1, w1)
        .addEdge(v1, w2)
        .addEdge(v2, w1)
        .addEdge(v2, w2);
      const transformed = new EdgeConcentrationTransformer().transform(graph);
      expect(transformed.inDegree(u1)).to.be(0);
      expect(transformed.outDegree(u1)).to.be(1);
      expect(transformed.inDegree(u2)).to.be(0);
      expect(transformed.outDegree(u2)).to.be(1);
      expect(transformed.inDegree(v1)).to.be(1);
      expect(transformed.outDegree(v1)).to.be(1);
      expect(transformed.inDegree(v2)).to.be(1);
      expect(transformed.outDegree(v2)).to.be(1);
      expect(transformed.inDegree(w1)).to.be(2);
      expect(transformed.outDegree(w1)).to.be(0);
      expect(transformed.inDegree(w2)).to.be(2);
      expect(transformed.outDegree(w2)).to.be(0);
    });

    it('returns transformed graph', () => {
      const [u1, u2, u3, u4] = [0, 1, 2, 3],
        [v1, v2, v3, v4] = [4, 5, 6, 7];
      const graph = new Graph()
        .addVertex(u1)
        .addVertex(u2)
        .addVertex(u3)
        .addVertex(u4)
        .addVertex(v1)
        .addVertex(v2)
        .addVertex(v3)
        .addVertex(v4)
        .addEdge(u1, v1)
        .addEdge(u1, v2)
        .addEdge(u2, v1)
        .addEdge(u2, v2)
        .addEdge(u3, v3)
        .addEdge(u3, v4)
        .addEdge(u4, v3)
        .addEdge(u4, v4);
      const transformed = new EdgeConcentrationTransformer().transform(graph);
      expect(transformed.inDegree(u1)).to.be(0);
      expect(transformed.outDegree(u1)).to.be(1);
      expect(transformed.inDegree(u2)).to.be(0);
      expect(transformed.outDegree(u2)).to.be(1);
      expect(transformed.inDegree(v1)).to.be(1);
      expect(transformed.outDegree(v1)).to.be(0);
      expect(transformed.inDegree(v2)).to.be(1);
      expect(transformed.outDegree(v2)).to.be(0);
      expect(transformed.inDegree(u3)).to.be(0);
      expect(transformed.outDegree(u3)).to.be(1);
      expect(transformed.inDegree(u4)).to.be(0);
      expect(transformed.outDegree(u4)).to.be(1);
      expect(transformed.inDegree(v3)).to.be(1);
      expect(transformed.outDegree(v3)).to.be(0);
      expect(transformed.inDegree(v4)).to.be(1);
      expect(transformed.outDegree(v4)).to.be(0);
    });

    it('returns transformed graph', () => {
      const [u1, u2, u3, u4, u5] = [0, 1, 2, 3, 4],
        [v1, v2, v3, v4, v5] = [5, 6, 7, 8, 9];
      const graph = new Graph()
        .addVertex(u1)
        .addVertex(u2)
        .addVertex(u3)
        .addVertex(u4)
        .addVertex(u5)
        .addVertex(v1)
        .addVertex(v2)
        .addVertex(v3)
        .addVertex(v4)
        .addVertex(v5)
        .addEdge(u1, v1)
        .addEdge(u1, v2)
        .addEdge(u1, v3)
        .addEdge(u2, v1)
        .addEdge(u2, v2)
        .addEdge(u2, v3)
        .addEdge(u3, v1)
        .addEdge(u3, v2)
        .addEdge(u3, v3)
        .addEdge(u3, v4)
        .addEdge(u3, v5)
        .addEdge(u4, v3)
        .addEdge(u4, v4)
        .addEdge(u4, v5)
        .addEdge(u5, v3)
        .addEdge(u5, v4)
        .addEdge(u5, v5);
      const transformed = new EdgeConcentrationTransformer().transform(graph);
      expect(transformed.inDegree(u1)).to.be(0);
      expect(transformed.outDegree(u1)).to.be(1);
      expect(transformed.inDegree(u2)).to.be(0);
      expect(transformed.outDegree(u2)).to.be(1);
      expect(transformed.inDegree(u3)).to.be(0);
      expect(transformed.outDegree(u3)).to.be(2);
      expect(transformed.inDegree(u4)).to.be(0);
      expect(transformed.outDegree(u4)).to.be(1);
      expect(transformed.inDegree(u5)).to.be(0);
      expect(transformed.outDegree(u5)).to.be(1);
      expect(transformed.inDegree(v1)).to.be(1);
      expect(transformed.outDegree(v1)).to.be(0);
      expect(transformed.inDegree(v2)).to.be(1);
      expect(transformed.outDegree(v2)).to.be(0);
      expect(transformed.inDegree(v3)).to.be(2);
      expect(transformed.outDegree(v3)).to.be(0);
      expect(transformed.inDegree(v4)).to.be(1);
      expect(transformed.outDegree(v4)).to.be(0);
      expect(transformed.inDegree(v4)).to.be(1);
      expect(transformed.outDegree(v4)).to.be(0);
    });
  });
});

describe('newbery(g, h1, h2)', () => {
  it('returns edge concentrations', () => {
    const h1 = [0, 1, 2],
      h2 = [3, 4, 5, 6, 7, 8, 9, 10, 11],
      [u1, u2, u3] = h1,
      [v1, v2, v3, v4, v5, v6, v7, v8, v9] = h2;
    const graph = new Graph()
      .addVertex(u1)
      .addVertex(u2)
      .addVertex(u3)
      .addVertex(v1)
      .addVertex(v2)
      .addVertex(v3)
      .addVertex(v4)
      .addVertex(v5)
      .addVertex(v6)
      .addVertex(v7)
      .addVertex(v8)
      .addVertex(v9)
      .addEdge(u1, v1)
      .addEdge(u1, v2)
      .addEdge(u1, v3)
      .addEdge(u1, v4)
      .addEdge(u1, v5)
      .addEdge(u1, v6)
      .addEdge(u1, v7)
      .addEdge(u2, v1)
      .addEdge(u2, v2)
      .addEdge(u2, v3)
      .addEdge(u2, v4)
      .addEdge(u2, v5)
      .addEdge(u2, v6)
      .addEdge(u2, v7)
      .addEdge(u2, v8)
      .addEdge(u2, v9)
      .addEdge(u3, v3)
      .addEdge(u3, v4)
      .addEdge(u3, v5)
      .addEdge(u3, v6)
      .addEdge(u3, v7)
      .addEdge(u3, v8)
      .addEdge(u3, v9);

    const result = newbery(graph, h1, h2);
    expect(result).to.be.eql([
      { source: [ 0, 2, 1 ], target: [ 5, 6, 7, 8, 9 ] },
      { source: [ 0, 1 ], target: [ 3, 4 ] },
      { source: [ 1, 2 ], target: [ 10, 11 ] }
    ]);
  });
});
