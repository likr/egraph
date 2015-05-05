'use strict';

import expect from 'expect.js';
import Graph from '../../../src/graph';
import median from '../../../src/layouter/sugiyama/misc/median';

describe('median(g, v)', () => {
  it('returns left median and right median of in vertices, which has even length, of v ', () => {
    const graph = new Graph();
    const a = graph.addVertex({order: 0});
    const b = graph.addVertex({order: 1});
    const c = graph.addVertex({order: 2});
    const d = graph.addVertex({order: 3});
    const e = graph.addVertex();
    graph.addEdge(a, e);
    graph.addEdge(b, e);
    graph.addEdge(c, e);
    graph.addEdge(d, e);
    expect(median(graph, e)).to.be.eql({
      left: b,
      right: c
    });
  });

  it('returns left median and right median of in vertices, which has odd length, of v', () => {
    const graph = new Graph();
    const a = graph.addVertex({order: 0});
    const b = graph.addVertex({order: 1});
    const c = graph.addVertex({order: 2});
    const d = graph.addVertex({order: 3});
    const e = graph.addVertex({order: 4});
    const f = graph.addVertex();
    graph.addEdge(a, f);
    graph.addEdge(b, f);
    graph.addEdge(c, f);
    graph.addEdge(d, f);
    graph.addEdge(e, f);
    expect(median(graph, f)).to.be.eql({
      left: c,
      right: c
    });
  });
});

describe('median(g, v, true)', () => {
  it('returns left median and right median of out vertices, which has even length, of v', () => {
    const graph = new Graph();
    const a = graph.addVertex({order: 0});
    const b = graph.addVertex({order: 1});
    const c = graph.addVertex({order: 2});
    const d = graph.addVertex({order: 3});
    const e = graph.addVertex();
    graph.addEdge(e, a);
    graph.addEdge(e, b);
    graph.addEdge(e, c);
    graph.addEdge(e, d);
    expect(median(graph, e, true)).to.be.eql({
      left: b,
      right: c
    });
  });

  it('returns left median and right median of out vertices, which has odd length, of v', () => {
    const graph = new Graph();
    const a = graph.addVertex({order: 0});
    const b = graph.addVertex({order: 1});
    const c = graph.addVertex({order: 2});
    const d = graph.addVertex({order: 3});
    const e = graph.addVertex({order: 4});
    const f = graph.addVertex();
    graph.addEdge(f, a);
    graph.addEdge(f, b);
    graph.addEdge(f, c);
    graph.addEdge(f, d);
    graph.addEdge(f, e);
    expect(median(graph, f, true)).to.be.eql({
      left: c,
      right: c
    });
  });
});
