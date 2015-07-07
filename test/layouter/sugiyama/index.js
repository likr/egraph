'use strict';

import expect from 'expect.js';
import Graph from '../../../src/graph';
import SugiyamaLayouter from '../../../src/layouter/sugiyama';

describe('SugiyamaLayouter', () => {
  describe('layout(g)', () => {
    it('returns positions of vertices', () => {
      const graph = new Graph();
      const a1 = graph.addVertex({width: 1, height: 1});
      const a2 = graph.addVertex({width: 1, height: 1});
      const a3 = graph.addVertex({width: 1, height: 1});
      const b1 = graph.addVertex({width: 1, height: 1});
      const b2 = graph.addVertex({width: 1, height: 1});
      const b3 = graph.addVertex({width: 1, height: 1});
      const c1 = graph.addVertex({width: 1, height: 1});
      const c2 = graph.addVertex({width: 1, height: 1});
      const c3 = graph.addVertex({width: 1, height: 1});
      const d1 = graph.addVertex({width: 1, height: 1});
      const d2 = graph.addVertex({width: 1, height: 1});
      const d3 = graph.addVertex({width: 1, height: 1});
      graph.addEdge(a1, b2);
      graph.addEdge(a2, b1);
      graph.addEdge(a3, b1);
      graph.addEdge(b1, c1);
      graph.addEdge(b2, c1);
      graph.addEdge(b2, c2);
      graph.addEdge(b2, c3);
      graph.addEdge(b3, c2);
      graph.addEdge(c1, d3);
      graph.addEdge(c2, d1);
      graph.addEdge(c2, d2);
      const layouter = new SugiyamaLayouter()
              .vertexLeftMargin(() => 2)
              .vertexRightMargin(() => 2)
              .vertexTopMargin(() => 2)
              .vertexBottomMargin(() => 2),
            result = layouter.layout(graph);
      expect(result).to.have.property('vertices');
      expect(result).to.have.property('edges');
    });
  });
});
