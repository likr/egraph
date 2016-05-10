const copy = require('../graph/copy')

class CopyTransformer {
  transform (g) {
    return copy(g)
  }
}

module.exports = CopyTransformer
