'use strict';

class PipeTransformer {
  constructor(...transformers) {
    this.transformers = transformers;
  }

  transform(g) {
    for (const transformer of this.transformers) {
      g = transformer.transform(g);
    }
    return g;
  }
}

export default PipeTransformer;
