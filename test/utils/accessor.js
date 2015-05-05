'use strict';

import expect from 'expect.js';
import accessor from '../../src/utils/accessor';

describe('accessor(self, privates, name, args)', () => {
  it('returns current private value', () => {
    const self = {},
          privates = new WeakMap();
    privates.set(self, {
      key: 'value'
    });
    expect(accessor(self, privates, 'key', [])).to.be('value');
  });

  it('sets private value and returns self', () => {
    const self = {},
          privates = new WeakMap();
    privates.set(self, {
      key: 'value'
    });
    expect(accessor(self, privates, 'key', ['new value'])).to.be(self);
    expect(privates.get(self).key).to.be('new value');
  });
});
