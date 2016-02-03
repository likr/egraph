import cycleEdges from './cycle-edges';

const cycleRemoval = (g) => {
  for (const [u, v] of cycleEdges(g)) {
    var obj = g.edge(u, v);
    g.removeEdge(u, v);
    if (u === v) {
      continue;
    }
    const edge = g.edge(v, u);
    if (edge) {
      edge.multiple = true;
    } else {
      g.addEdge(v, u, Object.assign({reversed: true}, obj));
    }
  }
};

class CycleRemoval {
  call(g) {
    cycleRemoval(g);
  }
}

export default CycleRemoval;
