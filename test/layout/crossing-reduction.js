'use strict';
var expect = require('expect.js'),
    graph = require('../../lib/graph'),
    cross = require('../../lib/layout/crossing-reduction/cross'),
    baryCenter = require('../../lib/layout/crossing-reduction/bary-center');

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
