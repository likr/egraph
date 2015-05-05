'use strict';

import expect from 'expect.js';
import Graph from '../../../src/graph';
import markConflicts from '../../../src/layout/position-assignment/brandes/mark-conflicts';
import verticalAlignment from '../../../src/layout/position-assignment/brandes/vertical-alignment';
import horizontalCompaction from '../../../src/layout/position-assignment/brandes/horizontal-compaction';

describe('markConflicts(g, layers)', () => {
  it('set flags to edges which has type 1 or 2 conflict', () => {
    const graph = new Graph();
    const a1 = graph.addVertex({layer: 0, order: 0});
    const a2 = graph.addVertex({layer: 0, order: 1});
    const b1 = graph.addVertex({layer: 1, order: 0});
    const b2 = graph.addVertex({layer: 1, order: 1});
    const b3 = graph.addVertex({layer: 1, order: 2, dummy: true});
    const b4 = graph.addVertex({layer: 1, order: 3});
    const b5 = graph.addVertex({layer: 1, order: 4, dummy: true});
    const b6 = graph.addVertex({layer: 1, order: 5, dummy: true});
    const b7 = graph.addVertex({layer: 1, order: 6});
    const b8 = graph.addVertex({layer: 1, order: 7});
    const c1 = graph.addVertex({layer: 2, order: 0});
    const c2 = graph.addVertex({layer: 2, order: 1});
    const c3 = graph.addVertex({layer: 2, order: 2, dummy: true});
    const c4 = graph.addVertex({layer: 2, order: 3, dummy: true});
    const c5 = graph.addVertex({layer: 2, order: 4, dummy: true});
    const c6 = graph.addVertex({layer: 2, order: 5});
    const d1 = graph.addVertex({layer: 3, order: 0});
    const d2 = graph.addVertex({layer: 3, order: 1});
    const d3 = graph.addVertex({layer: 3, order: 2, dummy: true});
    const d4 = graph.addVertex({layer: 3, order: 3, dummy: true});
    const d5 = graph.addVertex({layer: 3, order: 4, dummy: true});
    const d6 = graph.addVertex({layer: 3, order: 5});
    const d7 = graph.addVertex({layer: 3, order: 6, dummy: true});
    const e1 = graph.addVertex({layer: 4, order: 0});
    const e2 = graph.addVertex({layer: 4, order: 1});
    const e3 = graph.addVertex({layer: 4, order: 2});
    graph.addEdge(a1, b1);
    graph.addEdge(a1, b6);
    graph.addEdge(a1, b8);
    graph.addEdge(a2, b3);
    graph.addEdge(a2, b5);
    graph.addEdge(b2, c2);
    graph.addEdge(b3, c2);
    graph.addEdge(b4, c2);
    graph.addEdge(b5, c3);
    graph.addEdge(b6, c4);
    graph.addEdge(b7, c2);
    graph.addEdge(b7, c6);
    graph.addEdge(b8, c2);
    graph.addEdge(b8, c5);
    graph.addEdge(c1, d1);
    graph.addEdge(c1, d2);
    graph.addEdge(c1, d6);
    graph.addEdge(c3, d4);
    graph.addEdge(c4, d5);
    graph.addEdge(c5, d6);
    graph.addEdge(c6, d3);
    graph.addEdge(c6, d7);
    graph.addEdge(d1, e1);
    graph.addEdge(d1, e2);
    graph.addEdge(d2, e2);
    graph.addEdge(d3, e1);
    graph.addEdge(d4, e3);
    graph.addEdge(d5, e3);
    graph.addEdge(d6, e3);
    graph.addEdge(d7, e3);
    const layers = [
      [a1, a2],
      [b1, b2, b3, b4, b5, b6, b7, b8],
      [c1, c2, c3, c4, c5, c6],
      [d1, d2, d3, d4, d5, d6, d7],
      [e1, e2, e3]
    ];
    markConflicts(graph, layers);
    for (const [u, v] of graph.edges()) {
      if ((u === b7 && v === c2) || (u === b8 && v === c2) || (u === c1 && v === d6) || (u === c6 && v === d3)) {
        expect(graph.edge(u, v)).to.have.property('type1Conflict', true);
      } else {
        expect(graph.edge(u, v)).to.not.have.property('type1Conflict');
      }
    }
  });
});

describe('verticalAlignment(g, layers, {rtol: false, btot: false})', () => {
  it('set root and align for all vertices', () => {
    const graph = new Graph();
    const a1 = graph.addVertex({layer: 0, order: 0});
    const a2 = graph.addVertex({layer: 0, order: 1});
    const b1 = graph.addVertex({layer: 1, order: 0});
    const b2 = graph.addVertex({layer: 1, order: 1});
    const b3 = graph.addVertex({layer: 1, order: 2, dummy: true});
    const b4 = graph.addVertex({layer: 1, order: 3});
    const b5 = graph.addVertex({layer: 1, order: 4, dummy: true});
    const b6 = graph.addVertex({layer: 1, order: 5, dummy: true});
    const b7 = graph.addVertex({layer: 1, order: 6});
    const b8 = graph.addVertex({layer: 1, order: 7});
    const c1 = graph.addVertex({layer: 2, order: 0});
    const c2 = graph.addVertex({layer: 2, order: 1});
    const c3 = graph.addVertex({layer: 2, order: 2, dummy: true});
    const c4 = graph.addVertex({layer: 2, order: 3, dummy: true});
    const c5 = graph.addVertex({layer: 2, order: 4, dummy: true});
    const c6 = graph.addVertex({layer: 2, order: 5});
    const d1 = graph.addVertex({layer: 3, order: 0});
    const d2 = graph.addVertex({layer: 3, order: 1});
    const d3 = graph.addVertex({layer: 3, order: 2, dummy: true});
    const d4 = graph.addVertex({layer: 3, order: 3, dummy: true});
    const d5 = graph.addVertex({layer: 3, order: 4, dummy: true});
    const d6 = graph.addVertex({layer: 3, order: 5});
    const d7 = graph.addVertex({layer: 3, order: 6, dummy: true});
    const e1 = graph.addVertex({layer: 4, order: 0});
    const e2 = graph.addVertex({layer: 4, order: 1});
    const e3 = graph.addVertex({layer: 4, order: 2});
    graph.addEdge(a1, b1);
    graph.addEdge(a1, b6);
    graph.addEdge(a1, b8);
    graph.addEdge(a2, b3);
    graph.addEdge(a2, b5);
    graph.addEdge(b2, c2);
    graph.addEdge(b3, c2);
    graph.addEdge(b4, c2);
    graph.addEdge(b5, c3);
    graph.addEdge(b6, c4);
    graph.addEdge(b7, c2, {type1Conflict: true});
    graph.addEdge(b7, c6);
    graph.addEdge(b8, c2, {type1Conflict: true});
    graph.addEdge(b8, c5);
    graph.addEdge(c1, d1);
    graph.addEdge(c1, d2);
    graph.addEdge(c1, d6, {type1Conflict: true});
    graph.addEdge(c3, d4);
    graph.addEdge(c4, d5);
    graph.addEdge(c5, d6);
    graph.addEdge(c6, d3, {type1Conflict: true});
    graph.addEdge(c6, d7);
    graph.addEdge(d1, e1);
    graph.addEdge(d1, e2);
    graph.addEdge(d2, e2);
    graph.addEdge(d3, e1);
    graph.addEdge(d4, e3);
    graph.addEdge(d5, e3);
    graph.addEdge(d6, e3);
    graph.addEdge(d7, e3);
    const layers = [
      [a1, a2],
      [b1, b2, b3, b4, b5, b6, b7, b8],
      [c1, c2, c3, c4, c5, c6],
      [d1, d2, d3, d4, d5, d6, d7],
      [e1, e2, e3]
    ];
    verticalAlignment(graph, layers, {rtol: false, btot: false});
    expect(graph.vertex(a1)).to.have.property('root', a1);
    expect(graph.vertex(a1)).to.have.property('align', b1);
    expect(graph.vertex(a2)).to.have.property('root', a2);
    expect(graph.vertex(a2)).to.have.property('align', b3);
    expect(graph.vertex(b1)).to.have.property('root', a1);
    expect(graph.vertex(b1)).to.have.property('align', a1);
    expect(graph.vertex(b2)).to.have.property('root', b2);
    expect(graph.vertex(b2)).to.have.property('align', b2);
    expect(graph.vertex(b3)).to.have.property('root', a2);
    expect(graph.vertex(b3)).to.have.property('align', a2);
    expect(graph.vertex(b4)).to.have.property('root', b4);
    expect(graph.vertex(b4)).to.have.property('align', c2);
    expect(graph.vertex(b5)).to.have.property('root', b5);
    expect(graph.vertex(b5)).to.have.property('align', c3);
    expect(graph.vertex(b6)).to.have.property('root', b6);
    expect(graph.vertex(b6)).to.have.property('align', c4);
    expect(graph.vertex(b7)).to.have.property('root', b7);
    expect(graph.vertex(b7)).to.have.property('align', b7);
    expect(graph.vertex(b8)).to.have.property('root', b8);
    expect(graph.vertex(b8)).to.have.property('align', c5);
    expect(graph.vertex(c1)).to.have.property('root', c1);
    expect(graph.vertex(c1)).to.have.property('align', d1);
    expect(graph.vertex(c2)).to.have.property('root', b4);
    expect(graph.vertex(c2)).to.have.property('align', b4);
    expect(graph.vertex(c3)).to.have.property('root', b5);
    expect(graph.vertex(c3)).to.have.property('align', d4);
    expect(graph.vertex(c4)).to.have.property('root', b6);
    expect(graph.vertex(c4)).to.have.property('align', d5);
    expect(graph.vertex(c5)).to.have.property('root', b8);
    expect(graph.vertex(c5)).to.have.property('align', d6);
    expect(graph.vertex(c6)).to.have.property('root', c6);
    expect(graph.vertex(c6)).to.have.property('align', d7);
    expect(graph.vertex(d1)).to.have.property('root', c1);
    expect(graph.vertex(d1)).to.have.property('align', e1);
    expect(graph.vertex(d2)).to.have.property('root', d2);
    expect(graph.vertex(d2)).to.have.property('align', e2);
    expect(graph.vertex(d3)).to.have.property('root', d3);
    expect(graph.vertex(d3)).to.have.property('align', d3);
    expect(graph.vertex(d4)).to.have.property('root', b5);
    expect(graph.vertex(d4)).to.have.property('align', b5);
    expect(graph.vertex(d5)).to.have.property('root', b6);
    expect(graph.vertex(d5)).to.have.property('align', e3);
    expect(graph.vertex(d6)).to.have.property('root', b8);
    expect(graph.vertex(d6)).to.have.property('align', b8);
    expect(graph.vertex(d7)).to.have.property('root', c6);
    expect(graph.vertex(d7)).to.have.property('align', c6);
    expect(graph.vertex(e1)).to.have.property('root', c1);
    expect(graph.vertex(e1)).to.have.property('align', c1);
    expect(graph.vertex(e2)).to.have.property('root', d2);
    expect(graph.vertex(e2)).to.have.property('align', d2);
    expect(graph.vertex(e3)).to.have.property('root', b6);
    expect(graph.vertex(e3)).to.have.property('align', b6);
  });
});

describe('horizontalCompaction(g, layers)', () => {
  it('set x for all vertices', () => {
    const graph = new Graph();
    const a1 = graph.addVertex({width: 10, layer: 0, order: 0});
    const a2 = graph.addVertex({width: 10, layer: 0, order: 1});
    const b1 = graph.addVertex({width: 10, layer: 1, order: 0});
    const b2 = graph.addVertex({width: 10, layer: 1, order: 1});
    const b3 = graph.addVertex({width: 10, layer: 1, order: 2, dummy: true});
    const b4 = graph.addVertex({width: 10, layer: 1, order: 3});
    const b5 = graph.addVertex({width: 10, layer: 1, order: 4, dummy: true});
    const b6 = graph.addVertex({width: 10, layer: 1, order: 5, dummy: true});
    const b7 = graph.addVertex({width: 10, layer: 1, order: 6});
    const b8 = graph.addVertex({width: 10, layer: 1, order: 7});
    const c1 = graph.addVertex({width: 10, layer: 2, order: 0});
    const c2 = graph.addVertex({width: 10, layer: 2, order: 1});
    const c3 = graph.addVertex({width: 10, layer: 2, order: 2, dummy: true});
    const c4 = graph.addVertex({width: 10, layer: 2, order: 3, dummy: true});
    const c5 = graph.addVertex({width: 10, layer: 2, order: 4, dummy: true});
    const c6 = graph.addVertex({width: 10, layer: 2, order: 5});
    const d1 = graph.addVertex({width: 10, layer: 3, order: 0});
    const d2 = graph.addVertex({width: 10, layer: 3, order: 1});
    const d3 = graph.addVertex({width: 10, layer: 3, order: 2, dummy: true});
    const d4 = graph.addVertex({width: 10, layer: 3, order: 3, dummy: true});
    const d5 = graph.addVertex({width: 10, layer: 3, order: 4, dummy: true});
    const d6 = graph.addVertex({width: 10, layer: 3, order: 5});
    const d7 = graph.addVertex({width: 10, layer: 3, order: 6, dummy: true});
    const e1 = graph.addVertex({width: 10, layer: 4, order: 0});
    const e2 = graph.addVertex({width: 10, layer: 4, order: 1});
    const e3 = graph.addVertex({width: 10, layer: 4, order: 2});
    graph.addEdge(a1, b1);
    graph.addEdge(a1, b6);
    graph.addEdge(a1, b8);
    graph.addEdge(a2, b3);
    graph.addEdge(a2, b5);
    graph.addEdge(b2, c2);
    graph.addEdge(b3, c2);
    graph.addEdge(b4, c2);
    graph.addEdge(b5, c3);
    graph.addEdge(b6, c4);
    graph.addEdge(b7, c2, {type1Conflict: true});
    graph.addEdge(b7, c6);
    graph.addEdge(b8, c2, {type1Conflict: true});
    graph.addEdge(b8, c5);
    graph.addEdge(c1, d1);
    graph.addEdge(c1, d2);
    graph.addEdge(c1, d6, {type1Conflict: true});
    graph.addEdge(c3, d4);
    graph.addEdge(c4, d5);
    graph.addEdge(c5, d6);
    graph.addEdge(c6, d3, {type1Conflict: true});
    graph.addEdge(c6, d7);
    graph.addEdge(d1, e1);
    graph.addEdge(d1, e2);
    graph.addEdge(d2, e2);
    graph.addEdge(d3, e1);
    graph.addEdge(d4, e3);
    graph.addEdge(d5, e3);
    graph.addEdge(d6, e3);
    graph.addEdge(d7, e3);
    const layers = [
      [a1, a2],
      [b1, b2, b3, b4, b5, b6, b7, b8],
      [c1, c2, c3, c4, c5, c6],
      [d1, d2, d3, d4, d5, d6, d7],
      [e1, e2, e3]
    ];
    verticalAlignment(graph, layers, {rtol: false, btot: false});
    horizontalCompaction(graph, layers, {rtol: false, btot: false});
    expect(graph.vertex(a1)).to.have.property('x', 0);
    expect(graph.vertex(a2)).to.have.property('x', 20);
    expect(graph.vertex(b1)).to.have.property('x', 0);
    expect(graph.vertex(b2)).to.have.property('x', 10);
    expect(graph.vertex(b3)).to.have.property('x', 20);
    expect(graph.vertex(b4)).to.have.property('x', 30);
    expect(graph.vertex(b5)).to.have.property('x', 40);
    expect(graph.vertex(b6)).to.have.property('x', 50);
    expect(graph.vertex(b7)).to.have.property('x', 60);
    expect(graph.vertex(b8)).to.have.property('x', 70);
    expect(graph.vertex(c1)).to.have.property('x', 10);
    expect(graph.vertex(c2)).to.have.property('x', 30);
    expect(graph.vertex(c3)).to.have.property('x', 40);
    expect(graph.vertex(c4)).to.have.property('x', 50);
    expect(graph.vertex(c5)).to.have.property('x', 70);
    expect(graph.vertex(c6)).to.have.property('x', 80);
    expect(graph.vertex(d1)).to.have.property('x', 10);
    expect(graph.vertex(d2)).to.have.property('x', 20);
    expect(graph.vertex(d3)).to.have.property('x', 30);
    expect(graph.vertex(d4)).to.have.property('x', 40);
    expect(graph.vertex(d5)).to.have.property('x', 50);
    expect(graph.vertex(d6)).to.have.property('x', 70);
    expect(graph.vertex(d7)).to.have.property('x', 80);
    expect(graph.vertex(e1)).to.have.property('x', 10);
    expect(graph.vertex(e2)).to.have.property('x', 20);
    expect(graph.vertex(e3)).to.have.property('x', 50);
  });
});
