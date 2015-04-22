'use strict';

var expect = require('expect.js'),
    graph = require('../../../lib/graph'),
    markConflicts = require('../../../lib/layout/position-assignment/brandes/mark-conflicts');

describe('markConflicts(g, layers)', () => {
  it('set flags to edges which has type 1 or 2 conflict', () => {
    const g = graph();
    const a1 = g.addVertex({layer: 0, order: 0});
    const a2 = g.addVertex({layer: 0, order: 1});
    const b1 = g.addVertex({layer: 1, order: 0});
    const b2 = g.addVertex({layer: 1, order: 1});
    const b3 = g.addVertex({layer: 1, order: 2, dummy: true});
    const b4 = g.addVertex({layer: 1, order: 3});
    const b5 = g.addVertex({layer: 1, order: 4, dummy: true});
    const b6 = g.addVertex({layer: 1, order: 5, dummy: true});
    const b7 = g.addVertex({layer: 1, order: 6});
    const b8 = g.addVertex({layer: 1, order: 7});
    const c1 = g.addVertex({layer: 2, order: 0});
    const c2 = g.addVertex({layer: 2, order: 1});
    const c3 = g.addVertex({layer: 2, order: 2, dummy: true});
    const c4 = g.addVertex({layer: 2, order: 3, dummy: true});
    const c5 = g.addVertex({layer: 2, order: 4, dummy: true});
    const c6 = g.addVertex({layer: 2, order: 5});
    const d1 = g.addVertex({layer: 3, order: 0});
    const d2 = g.addVertex({layer: 3, order: 1});
    const d3 = g.addVertex({layer: 3, order: 2, dummy: true});
    const d4 = g.addVertex({layer: 3, order: 3, dummy: true});
    const d5 = g.addVertex({layer: 3, order: 4, dummy: true});
    const d6 = g.addVertex({layer: 3, order: 5});
    const d7 = g.addVertex({layer: 3, order: 6, dummy: true});
    const e1 = g.addVertex({layer: 4, order: 0});
    const e2 = g.addVertex({layer: 4, order: 1});
    const e3 = g.addVertex({layer: 4, order: 2});
    g.addEdge(a1, b1);
    g.addEdge(a1, b6);
    g.addEdge(a1, b8);
    g.addEdge(a2, b3);
    g.addEdge(a2, b5);
    g.addEdge(b2, c2);
    g.addEdge(b3, c2);
    g.addEdge(b4, c2);
    g.addEdge(b5, c3);
    g.addEdge(b6, c4);
    g.addEdge(b7, c2);
    g.addEdge(b7, c6);
    g.addEdge(b8, c2);
    g.addEdge(b8, c5);
    g.addEdge(c1, d1);
    g.addEdge(c1, d2);
    g.addEdge(c1, d6);
    g.addEdge(c3, d4);
    g.addEdge(c4, d5);
    g.addEdge(c5, d6);
    g.addEdge(c6, d3);
    g.addEdge(c6, d7);
    g.addEdge(d1, e1);
    g.addEdge(d1, e2);
    g.addEdge(d2, e2);
    g.addEdge(d3, e1);
    g.addEdge(d4, e3);
    g.addEdge(d5, e3);
    g.addEdge(d6, e3);
    g.addEdge(d7, e3);
    const layers = [
      [a1, a2],
      [b1, b2, b3, b4, b5, b6, b7, b8],
      [c1, c2, c3, c4, c5, c6],
      [d1, d2, d3, d4, d5, d6, d7],
      [e1, e2, e3]
    ];
    markConflicts(g, layers);
    for (const [u, v] of g.edges()) {
      if ((u === b7 && v === c2) || (u === b8 && v === c2) || (u === c1 && v === d6) || (u === c6 && v === d3)) {
        expect(g.edge(u, v)).to.have.property('type1Conflict', true);
      } else {
        expect(g.edge(u, v)).to.not.have.property('type1Conflict');
      }
    }
  });
});
