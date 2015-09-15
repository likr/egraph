'use strict';

import expect from 'expect.js';
import Graph from '../../../src/graph';
import median from '../../../src/layouter/sugiyama/misc/median';

describe('median(g, v)', () => {
  it('returns left median and right median of in vertices, which has even length, of v ', () => {
    const a = 0, b = 1, c = 2, d = 3, e = 4;
    const graph = new Graph()
      .addVertex(a, {order: 0})
      .addVertex(b, {order: 1})
      .addVertex(c, {order: 2})
      .addVertex(d, {order: 3})
      .addVertex(e)
      .addEdge(a, e)
      .addEdge(b, e)
      .addEdge(c, e)
      .addEdge(d, e);
    expect(median(graph, e)).to.be.eql({
      left: b,
      right: c
    });
  });

  it('returns left median and right median of in vertices, which has odd length, of v', () => {
    const a = 0, b = 1, c = 2, d = 3, e = 4, f = 5;
    const graph = new Graph()
      .addVertex(a, {order: 0})
      .addVertex(b, {order: 1})
      .addVertex(c, {order: 2})
      .addVertex(d, {order: 3})
      .addVertex(e, {order: 4})
      .addVertex(f)
      .addEdge(a, f)
      .addEdge(b, f)
      .addEdge(c, f)
      .addEdge(d, f)
      .addEdge(e, f);
    expect(median(graph, f)).to.be.eql({
      left: c,
      right: c
    });
  });
});

describe('median(g, v, true)', () => {
  it('returns left median and right median of out vertices, which has even length, of v', () => {
    const a = 0, b = 1, c = 2, d = 3, e = 4;
    const graph = new Graph()
      .addVertex(a, {order: 0})
      .addVertex(b, {order: 1})
      .addVertex(c, {order: 2})
      .addVertex(d, {order: 3})
      .addVertex(e)
      .addEdge(e, a)
      .addEdge(e, b)
      .addEdge(e, c)
      .addEdge(e, d);
    expect(median(graph, e, true)).to.be.eql({
      left: b,
      right: c
    });
  });

  it('returns left median and right median of out vertices, which has odd length, of v', () => {
    const a = 0, b = 1, c = 2, d = 3, e = 4, f = 5;
    const graph = new Graph()
      .addVertex(a, {order: 0})
      .addVertex(b, {order: 1})
      .addVertex(c, {order: 2})
      .addVertex(d, {order: 3})
      .addVertex(e, {order: 4})
      .addVertex(f)
      .addEdge(f, a)
      .addEdge(f, b)
      .addEdge(f, c)
      .addEdge(f, d)
      .addEdge(f, e);
    expect(median(graph, f, true)).to.be.eql({
      left: c,
      right: c
    });
  });
});
