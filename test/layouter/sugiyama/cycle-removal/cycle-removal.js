import expect from 'expect.js';
import Graph from '../../../../src/graph';
import CycleRemoval from '../../../../src/layouter/sugiyama/cycle-removal/cycle-removal';

describe('CycleRemoval', () => {
  describe('call(g)', () => {
    it('replace cycle edges with the inverse edges', () => {
      const [a, b, c] = [0, 1, 2];
      const graph = new Graph()
        .addVertex(a)
        .addVertex(b)
        .addVertex(c)
        .addEdge(a, b)
        .addEdge(b, c)
        .addEdge(c, a);
      new CycleRemoval().call(graph);
      expect(graph.edge(a, c)).to.be.ok();
    });

    it('should set multiple attribute', () => {
      const [a, b] = [0, 1];
      const graph = new Graph()
        .addVertex(a)
        .addVertex(b)
        .addEdge(a, b)
        .addEdge(b, a);
      new CycleRemoval().call(graph);
      expect(graph.edge(a, b).multiple === true).to.be.ok();
    });
  });
});
