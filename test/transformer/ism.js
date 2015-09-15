'use strict';

import expect from 'expect.js';
import Graph from '../../src/graph';
import IsmTransformer from '../../src/transformer/ism';

describe('IsmTransformer ', () => {
  describe('transform(g)', () => {
    it('returns transformed graph', () => {
      const u = 0, v = 1, w = 2;
      const graph = new Graph()
        .addVertex(u)
        .addVertex(v)
        .addVertex(w)
        .addEdge(u, v)
        .addEdge(u, w)
        .addEdge(v, w);
      const transformed = new IsmTransformer().transform(graph);
      expect(transformed.edge(u, v)).to.be.ok();
      expect(transformed.edge(v, w)).to.be.ok();
      expect(transformed.edge(u, w)).not.to.be.ok();
    });
  });
});
