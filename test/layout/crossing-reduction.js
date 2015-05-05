'use strict';

import expect from 'expect.js';
import Graph from '../../src/graph';
import cross from '../../src/layout/crossing-reduction/cross';
import crossingMatrix from '../../src/layout/crossing-reduction/crossing-matrix';
import baryCenter from '../../src/layout/crossing-reduction/bary-center';
import crossingReduction from '../../src/layout/crossing-reduction';

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

describe('crossingReduction(g, layers)', () => {
  it('sorts layers to minimize number of crossing', () => {
    const graph = new Graph();
    const a1 = graph.addVertex();
    const a2 = graph.addVertex();
    const a3 = graph.addVertex();
    const b1 = graph.addVertex();
    const b2 = graph.addVertex();
    const b3 = graph.addVertex();
    const c1 = graph.addVertex();
    const c2 = graph.addVertex();
    const c3 = graph.addVertex();
    const d1 = graph.addVertex();
    const d2 = graph.addVertex();
    const d3 = graph.addVertex();
    graph.addEdge(a1, b2);
    graph.addEdge(a2, b1);
    graph.addEdge(a3, b1);
    graph.addEdge(b1, c1);
    graph.addEdge(b2, c1);
    graph.addEdge(b2, c2);
    graph.addEdge(b2, c3);
    graph.addEdge(b3, c2);
    graph.addEdge(c1, d3);
    graph.addEdge(c2, d1);
    graph.addEdge(c2, d2);
    const layers = [
      [a1, a2, a3],
      [b1, b2, b3],
      [c1, c2, c3],
      [d1, d2, d3]
    ];
    crossingReduction(graph, layers);
    expect(layers).to.be.eql([
      [a2, a3, a1],
      [b1, b2, b3],
      [c1, c3, c2],
      [d3, d1, d2]
    ]);
  });
});
