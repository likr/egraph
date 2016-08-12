const cycleEdges = require('./cycle-edges')
const replace = require('./replace')

const cycleRemoval = (graph) => {
  replace(graph, cycleEdges(graph))
}

class CycleRemoval {
  call (g) {
    cycleRemoval(g)
  }
}

module.exports = CycleRemoval
