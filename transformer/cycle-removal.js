const accessor = require('../utils/accessor')
const {CycleRemoval} = require('../layouter/sugiyama/cycle-removal')

const privates = new WeakMap()

class CycleRemovalTransformer {
  constructor () {
    privates.set(this, {
      cycleRemoval: new CycleRemoval()
    })
  }

  transform (graph) {
    this.cycleRemoval().call(graph)
    return graph
  }

  cycleRemoval () {
    return accessor(this, privates, 'cycleRemoval', arguments)
  }
}

module.exports = CycleRemovalTransformer
