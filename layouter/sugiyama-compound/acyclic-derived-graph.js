const MinWeight = require('../sugiyama/cycle-removal/min-weight')

const acyclicDerivedGraph = (graph) => {
  const cycleRemoval = new MinWeight()
    .weight(({d}) => d.priority || 0)
  cycleRemoval.call(graph)
}

module.exports = acyclicDerivedGraph
