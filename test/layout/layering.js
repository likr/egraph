'use strict';

const expect = require('expect.js'),
      graph = require('../../lib/graph'),
      layerAssignment = require('../../lib/layout/layer-assignment');

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
      [a],
      [b, d],
      [c, e]
    ]);
  });
});
