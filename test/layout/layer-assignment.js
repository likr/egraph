'use strict';

import expect from 'expect.js';
import Graph from '../../src/graph';
import layerAssignment from '../../src/layout/layer-assignment';

describe('longestPath(g)', () => {
  it('returns layers', () => {
    const graph = new Graph();
    const a = graph.addVertex();
    const b = graph.addVertex();
    const c = graph.addVertex();
    const d = graph.addVertex();
    const e = graph.addVertex();
    graph.addEdge(a, b);
    graph.addEdge(b, c);
    graph.addEdge(d, c);
    graph.addEdge(d, e);
    expect(new layerAssignment.LongestPath().call(graph)).to.be.eql({
      [a]: 0,
      [b]: 1,
      [c]: 2,
      [d]: 1,
      [e]: 2
    });
  });
});
