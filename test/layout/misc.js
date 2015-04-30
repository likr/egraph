'use strict';

import expect from 'expect.js';
import graph from '../../src/graph';
import median from '../../src/layout/misc/median';

describe('median(g, v)', () => {
  it('returns left median and right median of in vertices, which has even length, of v ', () => {
    const g = graph();
    const a = g.addVertex({order: 0});
    const b = g.addVertex({order: 1});
    const c = g.addVertex({order: 2});
    const d = g.addVertex({order: 3});
    const e = g.addVertex();
    g.addEdge(a, e);
    g.addEdge(b, e);
    g.addEdge(c, e);
    g.addEdge(d, e);
    expect(median(g, e)).to.be.eql({
      left: b,
      right: c
    });
  });

  it('returns left median and right median of in vertices, which has odd length, of v', () => {
    const g = graph();
    const a = g.addVertex({order: 0});
    const b = g.addVertex({order: 1});
    const c = g.addVertex({order: 2});
    const d = g.addVertex({order: 3});
    const e = g.addVertex({order: 4});
    const f = g.addVertex();
    g.addEdge(a, f);
    g.addEdge(b, f);
    g.addEdge(c, f);
    g.addEdge(d, f);
    g.addEdge(e, f);
    expect(median(g, f)).to.be.eql({
      left: c,
      right: c
    });
  });
});

describe('median(g, v, true)', () => {
  it('returns left median and right median of out vertices, which has even length, of v', () => {
    const g = graph();
    const a = g.addVertex({order: 0});
    const b = g.addVertex({order: 1});
    const c = g.addVertex({order: 2});
    const d = g.addVertex({order: 3});
    const e = g.addVertex();
    g.addEdge(e, a);
    g.addEdge(e, b);
    g.addEdge(e, c);
    g.addEdge(e, d);
    expect(median(g, e, true)).to.be.eql({
      left: b,
      right: c
    });
  });

  it('returns left median and right median of out vertices, which has odd length, of v', () => {
    const g = graph();
    const a = g.addVertex({order: 0});
    const b = g.addVertex({order: 1});
    const c = g.addVertex({order: 2});
    const d = g.addVertex({order: 3});
    const e = g.addVertex({order: 4});
    const f = g.addVertex();
    g.addEdge(f, a);
    g.addEdge(f, b);
    g.addEdge(f, c);
    g.addEdge(f, d);
    g.addEdge(f, e);
    expect(median(g, f, true)).to.be.eql({
      left: c,
      right: c
    });
  });
});
