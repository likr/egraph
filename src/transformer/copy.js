'use strict';

import copy from '../graph/copy';

class CopyTransformer {
  constructor() {
  }

  transform(g) {
    return copy(g);
  }
}

export default CopyTransformer;
