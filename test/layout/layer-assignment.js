'use strict';

const expect = require('expect.js'),
      graph = require('../../lib/graph'),
      layerAssignment = require('../../lib/layout/layer-assignment'),
      longestPath = require('../../lib/layout/layer-assignment/longest-path');

describe('layerAssignment(g)', () => {
  it('returns layers', () => {
    const g = graph();
    const a = g.addVertex();
    const b = g.addVertex();
    const c = g.addVertex();
    const d = g.addVertex();
    const e = g.addVertex();
    g.addEdge(a, b);
    g.addEdge(b, c);
    g.addEdge(d, c);
    g.addEdge(d, e);
    expect(layerAssignment(g)).to.be.eql([
      [a, d],
      [b],
      [c, e]
    ]);
  });
});

describe('longestPath(g)', () => {
  it('assigns layer for each vertices', () => {
    const g = graph();
    const a = g.addVertex();
    const b = g.addVertex();
    const c = g.addVertex();
    const d = g.addVertex();
    const e = g.addVertex();
    g.addEdge(a, b);
    g.addEdge(b, c);
    g.addEdge(d, c);
    g.addEdge(d, e);
    longestPath(g);
    expect(g.vertex(a).layer).to.be(-2);
    expect(g.vertex(b).layer).to.be(-1);
    expect(g.vertex(c).layer).to.be(0);
    expect(g.vertex(d).layer).to.be(-1);
    expect(g.vertex(e).layer).to.be(0);
  });
});
