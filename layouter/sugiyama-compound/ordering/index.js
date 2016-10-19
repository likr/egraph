const accessor = require('../../../utils/accessor')
const {compoundOrdering} = require('./compound-ordering')

const CompoundOrdering = (() => {
  const privates = new WeakMap()

  return class CompoundOrdering {
    constructor () {
      privates.set(this, {
        repeat: 1
      })
    }

    call (graph) {
      compoundOrdering(graph, this.repeat())
    }

    repeat () {
      return accessor(this, privates, 'repeat', arguments)
    }
  }
})()

exports.CompoundOrdering = CompoundOrdering
