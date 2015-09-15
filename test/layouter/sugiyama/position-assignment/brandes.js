'use strict';

import expect from 'expect.js';
import Graph from '../../../../src/graph';
import markConflicts from '../../../../src/layouter/sugiyama/position-assignment/brandes/mark-conflicts';
import verticalAlignment from '../../../../src/layouter/sugiyama/position-assignment/brandes/vertical-alignment';
import horizontalCompaction from '../../../../src/layouter/sugiyama/position-assignment/brandes/horizontal-compaction';

describe('markConflicts(g, layers)', () => {
  it('set flags to edges which has type 1 or 2 conflict', () => {
    const [a1, a2] = [0, 1],
      [b1, b2, b3, b4, b5, b6, b7, b8] = [2, 3, 4, 5, 6, 7, 8, 9],
      [c1, c2, c3, c4, c5, c6] = [10, 11, 12, 13, 14, 15],
      [d1, d2, d3, d4, d5, d6, d7] = [16, 17, 18, 19, 20, 21, 22, 23],
      [e1, e2, e3] = [24, 25, 26];
    const graph = new Graph()
      .addVertex(a1, {width: 10, layer: 0, order: 0})
      .addVertex(a2, {width: 10, layer: 0, order: 1})
      .addVertex(b1, {width: 10, layer: 1, order: 0})
      .addVertex(b2, {width: 10, layer: 1, order: 1})
      .addVertex(b3, {width: 10, layer: 1, order: 2, dummy: true})
      .addVertex(b4, {width: 10, layer: 1, order: 3})
      .addVertex(b5, {width: 10, layer: 1, order: 4, dummy: true})
      .addVertex(b6, {width: 10, layer: 1, order: 5, dummy: true})
      .addVertex(b7, {width: 10, layer: 1, order: 6})
      .addVertex(b8, {width: 10, layer: 1, order: 7})
      .addVertex(c1, {width: 10, layer: 2, order: 0})
      .addVertex(c2, {width: 10, layer: 2, order: 1})
      .addVertex(c3, {width: 10, layer: 2, order: 2, dummy: true})
      .addVertex(c4, {width: 10, layer: 2, order: 3, dummy: true})
      .addVertex(c5, {width: 10, layer: 2, order: 4, dummy: true})
      .addVertex(c6, {width: 10, layer: 2, order: 5})
      .addVertex(d1, {width: 10, layer: 3, order: 0})
      .addVertex(d2, {width: 10, layer: 3, order: 1})
      .addVertex(d3, {width: 10, layer: 3, order: 2, dummy: true})
      .addVertex(d4, {width: 10, layer: 3, order: 3, dummy: true})
      .addVertex(d5, {width: 10, layer: 3, order: 4, dummy: true})
      .addVertex(d6, {width: 10, layer: 3, order: 5})
      .addVertex(d7, {width: 10, layer: 3, order: 6, dummy: true})
      .addVertex(e1, {width: 10, layer: 4, order: 0})
      .addVertex(e2, {width: 10, layer: 4, order: 1})
      .addVertex(e3, {width: 10, layer: 4, order: 2})
      .addEdge(a1, b1)
      .addEdge(a1, b6)
      .addEdge(a1, b8)
      .addEdge(a2, b3)
      .addEdge(a2, b5)
      .addEdge(b2, c2)
      .addEdge(b3, c2)
      .addEdge(b4, c2)
      .addEdge(b5, c3)
      .addEdge(b6, c4)
      .addEdge(b7, c2, {type1Conflict: true})
      .addEdge(b7, c6)
      .addEdge(b8, c2, {type1Conflict: true})
      .addEdge(b8, c5)
      .addEdge(c1, d1)
      .addEdge(c1, d2)
      .addEdge(c1, d6, {type1Conflict: true})
      .addEdge(c3, d4)
      .addEdge(c4, d5)
      .addEdge(c5, d6)
      .addEdge(c6, d3, {type1Conflict: true})
      .addEdge(c6, d7)
      .addEdge(d1, e1)
      .addEdge(d1, e2)
      .addEdge(d2, e2)
      .addEdge(d3, e1)
      .addEdge(d4, e3)
      .addEdge(d5, e3)
      .addEdge(d6, e3)
      .addEdge(d7, e3);
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
    const [a1, a2] = [0, 1],
      [b1, b2, b3, b4, b5, b6, b7, b8] = [2, 3, 4, 5, 6, 7, 8, 9],
      [c1, c2, c3, c4, c5, c6] = [10, 11, 12, 13, 14, 15],
      [d1, d2, d3, d4, d5, d6, d7] = [16, 17, 18, 19, 20, 21, 22, 23],
      [e1, e2, e3] = [24, 25, 26];
    const graph = new Graph()
      .addVertex(a1, {width: 10, layer: 0, order: 0})
      .addVertex(a2, {width: 10, layer: 0, order: 1})
      .addVertex(b1, {width: 10, layer: 1, order: 0})
      .addVertex(b2, {width: 10, layer: 1, order: 1})
      .addVertex(b3, {width: 10, layer: 1, order: 2, dummy: true})
      .addVertex(b4, {width: 10, layer: 1, order: 3})
      .addVertex(b5, {width: 10, layer: 1, order: 4, dummy: true})
      .addVertex(b6, {width: 10, layer: 1, order: 5, dummy: true})
      .addVertex(b7, {width: 10, layer: 1, order: 6})
      .addVertex(b8, {width: 10, layer: 1, order: 7})
      .addVertex(c1, {width: 10, layer: 2, order: 0})
      .addVertex(c2, {width: 10, layer: 2, order: 1})
      .addVertex(c3, {width: 10, layer: 2, order: 2, dummy: true})
      .addVertex(c4, {width: 10, layer: 2, order: 3, dummy: true})
      .addVertex(c5, {width: 10, layer: 2, order: 4, dummy: true})
      .addVertex(c6, {width: 10, layer: 2, order: 5})
      .addVertex(d1, {width: 10, layer: 3, order: 0})
      .addVertex(d2, {width: 10, layer: 3, order: 1})
      .addVertex(d3, {width: 10, layer: 3, order: 2, dummy: true})
      .addVertex(d4, {width: 10, layer: 3, order: 3, dummy: true})
      .addVertex(d5, {width: 10, layer: 3, order: 4, dummy: true})
      .addVertex(d6, {width: 10, layer: 3, order: 5})
      .addVertex(d7, {width: 10, layer: 3, order: 6, dummy: true})
      .addVertex(e1, {width: 10, layer: 4, order: 0})
      .addVertex(e2, {width: 10, layer: 4, order: 1})
      .addVertex(e3, {width: 10, layer: 4, order: 2})
      .addEdge(a1, b1)
      .addEdge(a1, b6)
      .addEdge(a1, b8)
      .addEdge(a2, b3)
      .addEdge(a2, b5)
      .addEdge(b2, c2)
      .addEdge(b3, c2)
      .addEdge(b4, c2)
      .addEdge(b5, c3)
      .addEdge(b6, c4)
      .addEdge(b7, c2, {type1Conflict: true})
      .addEdge(b7, c6)
      .addEdge(b8, c2, {type1Conflict: true})
      .addEdge(b8, c5)
      .addEdge(c1, d1)
      .addEdge(c1, d2)
      .addEdge(c1, d6, {type1Conflict: true})
      .addEdge(c3, d4)
      .addEdge(c4, d5)
      .addEdge(c5, d6)
      .addEdge(c6, d3, {type1Conflict: true})
      .addEdge(c6, d7)
      .addEdge(d1, e1)
      .addEdge(d1, e2)
      .addEdge(d2, e2)
      .addEdge(d3, e1)
      .addEdge(d4, e3)
      .addEdge(d5, e3)
      .addEdge(d6, e3)
      .addEdge(d7, e3);
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
    const [a1, a2] = [0, 1],
      [b1, b2, b3, b4, b5, b6, b7, b8] = [2, 3, 4, 5, 6, 7, 8, 9],
      [c1, c2, c3, c4, c5, c6] = [10, 11, 12, 13, 14, 15],
      [d1, d2, d3, d4, d5, d6, d7] = [16, 17, 18, 19, 20, 21, 22, 23],
      [e1, e2, e3] = [24, 25, 26];
    const graph = new Graph()
      .addVertex(a1, {width: 10, layer: 0, order: 0})
      .addVertex(a2, {width: 10, layer: 0, order: 1})
      .addVertex(b1, {width: 10, layer: 1, order: 0})
      .addVertex(b2, {width: 10, layer: 1, order: 1})
      .addVertex(b3, {width: 10, layer: 1, order: 2, dummy: true})
      .addVertex(b4, {width: 10, layer: 1, order: 3})
      .addVertex(b5, {width: 10, layer: 1, order: 4, dummy: true})
      .addVertex(b6, {width: 10, layer: 1, order: 5, dummy: true})
      .addVertex(b7, {width: 10, layer: 1, order: 6})
      .addVertex(b8, {width: 10, layer: 1, order: 7})
      .addVertex(c1, {width: 10, layer: 2, order: 0})
      .addVertex(c2, {width: 10, layer: 2, order: 1})
      .addVertex(c3, {width: 10, layer: 2, order: 2, dummy: true})
      .addVertex(c4, {width: 10, layer: 2, order: 3, dummy: true})
      .addVertex(c5, {width: 10, layer: 2, order: 4, dummy: true})
      .addVertex(c6, {width: 10, layer: 2, order: 5})
      .addVertex(d1, {width: 10, layer: 3, order: 0})
      .addVertex(d2, {width: 10, layer: 3, order: 1})
      .addVertex(d3, {width: 10, layer: 3, order: 2, dummy: true})
      .addVertex(d4, {width: 10, layer: 3, order: 3, dummy: true})
      .addVertex(d5, {width: 10, layer: 3, order: 4, dummy: true})
      .addVertex(d6, {width: 10, layer: 3, order: 5})
      .addVertex(d7, {width: 10, layer: 3, order: 6, dummy: true})
      .addVertex(e1, {width: 10, layer: 4, order: 0})
      .addVertex(e2, {width: 10, layer: 4, order: 1})
      .addVertex(e3, {width: 10, layer: 4, order: 2})
      .addEdge(a1, b1)
      .addEdge(a1, b6)
      .addEdge(a1, b8)
      .addEdge(a2, b3)
      .addEdge(a2, b5)
      .addEdge(b2, c2)
      .addEdge(b3, c2)
      .addEdge(b4, c2)
      .addEdge(b5, c3)
      .addEdge(b6, c4)
      .addEdge(b7, c2, {type1Conflict: true})
      .addEdge(b7, c6)
      .addEdge(b8, c2, {type1Conflict: true})
      .addEdge(b8, c5)
      .addEdge(c1, d1)
      .addEdge(c1, d2)
      .addEdge(c1, d6, {type1Conflict: true})
      .addEdge(c3, d4)
      .addEdge(c4, d5)
      .addEdge(c5, d6)
      .addEdge(c6, d3, {type1Conflict: true})
      .addEdge(c6, d7)
      .addEdge(d1, e1)
      .addEdge(d1, e2)
      .addEdge(d2, e2)
      .addEdge(d3, e1)
      .addEdge(d4, e3)
      .addEdge(d5, e3)
      .addEdge(d6, e3)
      .addEdge(d7, e3);
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
