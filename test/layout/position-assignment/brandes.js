'use strict';

var expect = require('expect.js'),
    graph = require('../../../src/graph'),
    markConflicts = require('../../../src/layout/position-assignment/brandes/mark-conflicts'),
    verticalAlignment = require('../../../src/layout/position-assignment/brandes/vertical-alignment'),
    horizontalCompaction = require('../../../src/layout/position-assignment/brandes/horizontal-compaction');

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

describe('verticalAlignment(g, layers, {rtol: false, btot: false})', () => {
  it('set root and align for all vertices', () => {
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
    g.addEdge(b7, c2, {type1Conflict: true});
    g.addEdge(b7, c6);
    g.addEdge(b8, c2, {type1Conflict: true});
    g.addEdge(b8, c5);
    g.addEdge(c1, d1);
    g.addEdge(c1, d2);
    g.addEdge(c1, d6, {type1Conflict: true});
    g.addEdge(c3, d4);
    g.addEdge(c4, d5);
    g.addEdge(c5, d6);
    g.addEdge(c6, d3, {type1Conflict: true});
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
    verticalAlignment(g, layers, {rtol: false, btot: false});
    expect(g.vertex(a1)).to.have.property('root', a1);
    expect(g.vertex(a1)).to.have.property('align', b1);
    expect(g.vertex(a2)).to.have.property('root', a2);
    expect(g.vertex(a2)).to.have.property('align', b3);
    expect(g.vertex(b1)).to.have.property('root', a1);
    expect(g.vertex(b1)).to.have.property('align', a1);
    expect(g.vertex(b2)).to.have.property('root', b2);
    expect(g.vertex(b2)).to.have.property('align', b2);
    expect(g.vertex(b3)).to.have.property('root', a2);
    expect(g.vertex(b3)).to.have.property('align', a2);
    expect(g.vertex(b4)).to.have.property('root', b4);
    expect(g.vertex(b4)).to.have.property('align', c2);
    expect(g.vertex(b5)).to.have.property('root', b5);
    expect(g.vertex(b5)).to.have.property('align', c3);
    expect(g.vertex(b6)).to.have.property('root', b6);
    expect(g.vertex(b6)).to.have.property('align', c4);
    expect(g.vertex(b7)).to.have.property('root', b7);
    expect(g.vertex(b7)).to.have.property('align', b7);
    expect(g.vertex(b8)).to.have.property('root', b8);
    expect(g.vertex(b8)).to.have.property('align', c5);
    expect(g.vertex(c1)).to.have.property('root', c1);
    expect(g.vertex(c1)).to.have.property('align', d1);
    expect(g.vertex(c2)).to.have.property('root', b4);
    expect(g.vertex(c2)).to.have.property('align', b4);
    expect(g.vertex(c3)).to.have.property('root', b5);
    expect(g.vertex(c3)).to.have.property('align', d4);
    expect(g.vertex(c4)).to.have.property('root', b6);
    expect(g.vertex(c4)).to.have.property('align', d5);
    expect(g.vertex(c5)).to.have.property('root', b8);
    expect(g.vertex(c5)).to.have.property('align', d6);
    expect(g.vertex(c6)).to.have.property('root', c6);
    expect(g.vertex(c6)).to.have.property('align', d7);
    expect(g.vertex(d1)).to.have.property('root', c1);
    expect(g.vertex(d1)).to.have.property('align', e1);
    expect(g.vertex(d2)).to.have.property('root', d2);
    expect(g.vertex(d2)).to.have.property('align', e2);
    expect(g.vertex(d3)).to.have.property('root', d3);
    expect(g.vertex(d3)).to.have.property('align', d3);
    expect(g.vertex(d4)).to.have.property('root', b5);
    expect(g.vertex(d4)).to.have.property('align', b5);
    expect(g.vertex(d5)).to.have.property('root', b6);
    expect(g.vertex(d5)).to.have.property('align', e3);
    expect(g.vertex(d6)).to.have.property('root', b8);
    expect(g.vertex(d6)).to.have.property('align', b8);
    expect(g.vertex(d7)).to.have.property('root', c6);
    expect(g.vertex(d7)).to.have.property('align', c6);
    expect(g.vertex(e1)).to.have.property('root', c1);
    expect(g.vertex(e1)).to.have.property('align', c1);
    expect(g.vertex(e2)).to.have.property('root', d2);
    expect(g.vertex(e2)).to.have.property('align', d2);
    expect(g.vertex(e3)).to.have.property('root', b6);
    expect(g.vertex(e3)).to.have.property('align', b6);
  });
});

describe('horizontalCompaction(g, layers)', () => {
  it('set x for all vertices', () => {
    const g = graph();
    const a1 = g.addVertex({width: 10, layer: 0, order: 0});
    const a2 = g.addVertex({width: 10, layer: 0, order: 1});
    const b1 = g.addVertex({width: 10, layer: 1, order: 0});
    const b2 = g.addVertex({width: 10, layer: 1, order: 1});
    const b3 = g.addVertex({width: 10, layer: 1, order: 2, dummy: true});
    const b4 = g.addVertex({width: 10, layer: 1, order: 3});
    const b5 = g.addVertex({width: 10, layer: 1, order: 4, dummy: true});
    const b6 = g.addVertex({width: 10, layer: 1, order: 5, dummy: true});
    const b7 = g.addVertex({width: 10, layer: 1, order: 6});
    const b8 = g.addVertex({width: 10, layer: 1, order: 7});
    const c1 = g.addVertex({width: 10, layer: 2, order: 0});
    const c2 = g.addVertex({width: 10, layer: 2, order: 1});
    const c3 = g.addVertex({width: 10, layer: 2, order: 2, dummy: true});
    const c4 = g.addVertex({width: 10, layer: 2, order: 3, dummy: true});
    const c5 = g.addVertex({width: 10, layer: 2, order: 4, dummy: true});
    const c6 = g.addVertex({width: 10, layer: 2, order: 5});
    const d1 = g.addVertex({width: 10, layer: 3, order: 0});
    const d2 = g.addVertex({width: 10, layer: 3, order: 1});
    const d3 = g.addVertex({width: 10, layer: 3, order: 2, dummy: true});
    const d4 = g.addVertex({width: 10, layer: 3, order: 3, dummy: true});
    const d5 = g.addVertex({width: 10, layer: 3, order: 4, dummy: true});
    const d6 = g.addVertex({width: 10, layer: 3, order: 5});
    const d7 = g.addVertex({width: 10, layer: 3, order: 6, dummy: true});
    const e1 = g.addVertex({width: 10, layer: 4, order: 0});
    const e2 = g.addVertex({width: 10, layer: 4, order: 1});
    const e3 = g.addVertex({width: 10, layer: 4, order: 2});
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
    g.addEdge(b7, c2, {type1Conflict: true});
    g.addEdge(b7, c6);
    g.addEdge(b8, c2, {type1Conflict: true});
    g.addEdge(b8, c5);
    g.addEdge(c1, d1);
    g.addEdge(c1, d2);
    g.addEdge(c1, d6, {type1Conflict: true});
    g.addEdge(c3, d4);
    g.addEdge(c4, d5);
    g.addEdge(c5, d6);
    g.addEdge(c6, d3, {type1Conflict: true});
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
    verticalAlignment(g, layers, {rtol: false, btot: false});
    horizontalCompaction(g, layers, {rtol: false, btot: false});
    expect(g.vertex(a1)).to.have.property('x', 0);
    expect(g.vertex(a2)).to.have.property('x', 20);
    expect(g.vertex(b1)).to.have.property('x', 0);
    expect(g.vertex(b2)).to.have.property('x', 10);
    expect(g.vertex(b3)).to.have.property('x', 20);
    expect(g.vertex(b4)).to.have.property('x', 30);
    expect(g.vertex(b5)).to.have.property('x', 40);
    expect(g.vertex(b6)).to.have.property('x', 50);
    expect(g.vertex(b7)).to.have.property('x', 60);
    expect(g.vertex(b8)).to.have.property('x', 70);
    expect(g.vertex(c1)).to.have.property('x', 10);
    expect(g.vertex(c2)).to.have.property('x', 30);
    expect(g.vertex(c3)).to.have.property('x', 40);
    expect(g.vertex(c4)).to.have.property('x', 50);
    expect(g.vertex(c5)).to.have.property('x', 70);
    expect(g.vertex(c6)).to.have.property('x', 80);
    expect(g.vertex(d1)).to.have.property('x', 10);
    expect(g.vertex(d2)).to.have.property('x', 20);
    expect(g.vertex(d3)).to.have.property('x', 30);
    expect(g.vertex(d4)).to.have.property('x', 40);
    expect(g.vertex(d5)).to.have.property('x', 50);
    expect(g.vertex(d6)).to.have.property('x', 70);
    expect(g.vertex(d7)).to.have.property('x', 80);
    expect(g.vertex(e1)).to.have.property('x', 10);
    expect(g.vertex(e2)).to.have.property('x', 20);
    expect(g.vertex(e3)).to.have.property('x', 50);
  });
});
