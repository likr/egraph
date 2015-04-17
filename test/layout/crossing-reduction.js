'use strict';
const expect = require('expect.js'),
      graph = require('../../lib/graph'),
      cross = require('../../lib/layout/crossing-reduction/cross'),
      baryCenter = require('../../lib/layout/crossing-reduction/bary-center'),
      crossingReduction = require('../../lib/layout/crossing-reduction');

describe('cross(g, h1, h2)', () => {
  it('returns the number of crossing', () => {
    let g = graph();
    let u1 = g.addVertex();
    let u2 = g.addVertex();
    let u3 = g.addVertex();
    let u4 = g.addVertex();
    let v1 = g.addVertex();
    let v2 = g.addVertex();
    let v3 = g.addVertex();
    g.addEdge(u1, v2);
    g.addEdge(u2, v2);
    g.addEdge(u2, v3);
    g.addEdge(u3, v1);
    g.addEdge(u3, v3);
    g.addEdge(u4, v2);
    expect(cross(g, [u1, u2, u3, u4], [v1, v2, v3])).to.be(5);
  });
});

describe('baryCenter(g, h1, h2)', () => {
  it('sorts h2', () => {
    let g = graph();
    let u1 = g.addVertex();
    let u2 = g.addVertex();
    let u3 = g.addVertex();
    let u4 = g.addVertex();
    let v1 = g.addVertex();
    let v2 = g.addVertex();
    let v3 = g.addVertex();
    g.addEdge(u1, v2);
    g.addEdge(u2, v2);
    g.addEdge(u2, v3);
    g.addEdge(u3, v1);
    g.addEdge(u3, v3);
    g.addEdge(u4, v2);
    let h1 = [u1, u2, u3, u4],
        h2 = [v1, v2, v3];
    baryCenter(g, h1, h2);
    expect(h2).to.be.eql([v2, v3, v1]);
  });
});

describe('baryCenter(g, h1, h2, true)', () => {
  it('sorts h1', () => {
    let g = graph();
    let u1 = g.addVertex();
    let u2 = g.addVertex();
    let u3 = g.addVertex();
    let u4 = g.addVertex();
    let v1 = g.addVertex();
    let v2 = g.addVertex();
    let v3 = g.addVertex();
    g.addEdge(u1, v2);
    g.addEdge(u2, v2);
    g.addEdge(u2, v3);
    g.addEdge(u3, v1);
    g.addEdge(u3, v3);
    g.addEdge(u4, v2);
    let h1 = [u1, u2, u3, u4],
        h2 = [v1, v2, v3];
    baryCenter(g, h1, h2, true);
    expect(h1).to.be.eql([u1, u3, u4, u2]);
  });
});

describe('crossingReduction(g, layers)', () => {
  it('sorts layers to minimize number of crossing', () => {
    const g = graph();
    const a1 = g.addVertex();
    const a2 = g.addVertex();
    const a3 = g.addVertex();
    const b1 = g.addVertex();
    const b2 = g.addVertex();
    const b3 = g.addVertex();
    const c1 = g.addVertex();
    const c2 = g.addVertex();
    const c3 = g.addVertex();
    const d1 = g.addVertex();
    const d2 = g.addVertex();
    const d3 = g.addVertex();
    g.addEdge(a1, b2);
    g.addEdge(a2, b1);
    g.addEdge(a3, b1);
    g.addEdge(b1, c1);
    g.addEdge(b2, c1);
    g.addEdge(b2, c2);
    g.addEdge(b2, c3);
    g.addEdge(b3, c2);
    g.addEdge(c1, d3);
    g.addEdge(c2, d1);
    g.addEdge(c2, d2);
    const layers = [
      [a1, a2, a3],
      [b1, b2, b3],
      [c1, c2, c3],
      [d1, d2, d3]
    ];
    crossingReduction(g, layers);
    expect(layers).to.be.eql([
      [a2, a3, a1],
      [b1, b2, b3],
      [c1, c3, c2],
      [d3, d1, d2]
    ]);
  });
});
