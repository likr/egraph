'use strict';

import expect from 'expect.js';
import Graph from '../../../../src/graph';
import CycleRemoval from '../../../../src/layouter/sugiyama/cycle-removal/cycle-removal';

describe('CycleRemoval', () => {
  describe('call(g)', () => {
    it('replace cycle edges with the inverse edges', () => {
      const graph = new Graph();
      const a = graph.addVertex();
      const b = graph.addVertex();
      const c = graph.addVertex();
      graph.addEdge(a, b);
      graph.addEdge(b, c);
      graph.addEdge(c, a);
      new CycleRemoval().call(graph);
      expect(graph.edge(a, c)).to.be.ok();
    });
  });
});
