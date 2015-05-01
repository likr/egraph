'use strict';

import expect from 'expect.js';
import graph from '../../src/graph';
import layerAssignment from '../../src/layout/layer-assignment';

describe('longestPath(g)', () => {
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
    expect(layerAssignment.longestPath(g)).to.be.eql({
      [a]: 0,
      [b]: 1,
      [c]: 2,
      [d]: 1,
      [e]: 2
    });
  });
});
