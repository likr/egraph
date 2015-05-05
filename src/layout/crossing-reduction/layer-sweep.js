'use strict';

import accessor from '../../utils/accessor';
import baryCenter from './bary-center';

const privates = new WeakMap();

class LayerSweep {
  constructor() {
    privates.set(this, {
      repeat: 8,
      method: baryCenter
    });
  }

  call(g, layers) {
    const n = layers.length,
          repeat = this.repeat(),
          method = this.method();

    for (let loop = 0; loop < repeat; ++loop) {
      for (let i = 1; i < n; ++i) {
        method(g, layers[i - 1], layers[i]);
      }
      for (let i = n - 1; i > 0; --i) {
        method(g, layers[i - 1], layers[i], true);
      }
    }
  }

  repeat(arg) {
    return accessor(this, privates, 'repeat', arguments);
  }

  method(arg) {
    return accessor(this, privates, 'method', arguments);
  }
}

export default LayerSweep;
