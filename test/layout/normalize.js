'use strict';

import expect from 'expect.js';
import graph from '../../src/graph';
import normalize from '../../src/layout/normalize';

describe('normalize(g, edgeMargin)', () => {
  it('inserts dummy vertices and edges', () => {
    const g = graph();
    const a = g.addVertex({layer: 0});
    const b = g.addVertex({layer: 1});
    const c = g.addVertex({layer: 2});
    g.addEdge(a, b);
    g.addEdge(b, c);
    g.addEdge(a, c);
    const layers = [[a], [b], [c]];
    normalize(g, layers, 5);
    expect(g.numVertices()).to.be(4);
    expect(g.numEdges()).to.be(4);
    expect(g.vertex(3).dummy).to.be.ok();
    expect(g.edge(a, 3).dummy).to.be.ok();
    expect(g.edge(3, c).dummy).to.be.ok();
    expect(layers).to.be.eql([[a], [b, 3], [c]]);
  });
});
