'use strict';

import expect from 'expect.js';
import Graph from '../../src/graph';
import IsmTransformer from '../../src/transformer/ism';

describe('IsmTransformer ', () => {
  describe('transform(g)', () => {
    it('returns transformed graph', () => {
      const graph = new Graph();
      const u = graph.addVertex();
      const v = graph.addVertex();
      const w = graph.addVertex();
      graph.addEdge(u, v);
      graph.addEdge(u, w);
      graph.addEdge(v, w);
      const transformed = new IsmTransformer().transform(graph);
      expect(transformed.edge(u, v)).to.be.ok();
      expect(transformed.edge(v, w)).to.be.ok();
      expect(transformed.edge(u, w)).not.to.be.ok();
    });
  });
});
