const {layerAssignment} = require('./layer-assignment')

const LayerAssignment = (() => {
  const privates = new WeakMap()

  return class LayerAssignment {
    constructor () {
      privates.set(this, {
      })
    }

    call (graph) {
      layerAssignment(graph)
    }
  }
})()

exports.LayerAssignment = LayerAssignment
