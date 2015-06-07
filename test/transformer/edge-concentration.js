'use strict';

import expect from 'expect.js';
import Graph from '../../src/graph';
import EdgeConcentrationTransformer from '../../src/transformer/edge-concentration';
import newbery from '../../src/transformer/edge-concentration/newbery';

describe('EdgeConcentrationTransformer', () => {
  describe('transform(g)', () => {
    it('returns transformed graph', () => {
      const graph = new Graph();
      const u1 = graph.addVertex();
      const u2 = graph.addVertex();
      const v1 = graph.addVertex();
      const v2 = graph.addVertex();
      const w1 = graph.addVertex();
      const w2 = graph.addVertex();
      graph.addEdge(u1, v1);
      graph.addEdge(u1, v2);
      graph.addEdge(u1, w1);
      graph.addEdge(u1, w2);
      graph.addEdge(u2, v1);
      graph.addEdge(u2, v2);
      graph.addEdge(u2, w1);
      graph.addEdge(u2, w2);
      graph.addEdge(v1, w1);
      graph.addEdge(v1, w2);
      graph.addEdge(v2, w1);
      graph.addEdge(v2, w2);
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
      const graph = new Graph();
      const u1 = graph.addVertex();
      const u2 = graph.addVertex();
      const u3 = graph.addVertex();
      const u4 = graph.addVertex();
      const v1 = graph.addVertex();
      const v2 = graph.addVertex();
      const v3 = graph.addVertex();
      const v4 = graph.addVertex();
      graph.addEdge(u1, v1);
      graph.addEdge(u1, v2);
      graph.addEdge(u2, v1);
      graph.addEdge(u2, v2);
      graph.addEdge(u3, v3);
      graph.addEdge(u3, v4);
      graph.addEdge(u4, v3);
      graph.addEdge(u4, v4);
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
      const graph = new Graph();
      const u1 = graph.addVertex();
      const u2 = graph.addVertex();
      const u3 = graph.addVertex();
      const u4 = graph.addVertex();
      const u5 = graph.addVertex();
      const v1 = graph.addVertex();
      const v2 = graph.addVertex();
      const v3 = graph.addVertex();
      const v4 = graph.addVertex();
      const v5 = graph.addVertex();
      graph.addEdge(u1, v1);
      graph.addEdge(u1, v2);
      graph.addEdge(u1, v3);
      graph.addEdge(u2, v1);
      graph.addEdge(u2, v2);
      graph.addEdge(u2, v3);
      graph.addEdge(u3, v1);
      graph.addEdge(u3, v2);
      graph.addEdge(u3, v3);
      graph.addEdge(u3, v4);
      graph.addEdge(u3, v5);
      graph.addEdge(u4, v3);
      graph.addEdge(u4, v4);
      graph.addEdge(u4, v5);
      graph.addEdge(u5, v3);
      graph.addEdge(u5, v4);
      graph.addEdge(u5, v5);
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
    const g = new Graph(),
          u1 = g.addVertex(),
          u2 = g.addVertex(),
          u3 = g.addVertex(),
          v1 = g.addVertex(),
          v2 = g.addVertex(),
          v3 = g.addVertex(),
          v4 = g.addVertex(),
          v5 = g.addVertex(),
          v6 = g.addVertex(),
          v7 = g.addVertex(),
          v8 = g.addVertex(),
          v9 = g.addVertex(),
          h1 = [u1, u2, u3],
          h2 = [v1, v2, v3, v4, v5, v6, v7, v8, v9];
    g.addEdge(u1, v1);
    g.addEdge(u1, v2);
    g.addEdge(u1, v3);
    g.addEdge(u1, v4);
    g.addEdge(u1, v5);
    g.addEdge(u1, v6);
    g.addEdge(u1, v7);
    g.addEdge(u2, v1);
    g.addEdge(u2, v2);
    g.addEdge(u2, v3);
    g.addEdge(u2, v4);
    g.addEdge(u2, v5);
    g.addEdge(u2, v6);
    g.addEdge(u2, v7);
    g.addEdge(u2, v8);
    g.addEdge(u2, v9);
    g.addEdge(u3, v3);
    g.addEdge(u3, v4);
    g.addEdge(u3, v5);
    g.addEdge(u3, v6);
    g.addEdge(u3, v7);
    g.addEdge(u3, v8);
    g.addEdge(u3, v9);

    const result = newbery(g, h1, h2);
    expect(result).to.be.eql([
      { source: [ 0, 2, 1 ], target: [ 5, 6, 7, 8, 9 ] },
      { source: [ 0, 1 ], target: [ 3, 4 ] },
      { source: [ 1, 2 ], target: [ 10, 11 ] }
    ]);
  });
});
