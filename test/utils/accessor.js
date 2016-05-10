/* eslint-env mocha */
const assert = require('power-assert')
const accessor = require('../../utils/accessor')

describe('accessor(self, privates, name, args)', () => {
  it('returns current private value', () => {
    const self = {}
    const privates = new WeakMap()
    privates.set(self, {
      key: 'value'
    })
    assert.equal(accessor(self, privates, 'key', []), 'value')
  })

  it('sets private value and returns self', () => {
    const self = {}
    const privates = new WeakMap()
    privates.set(self, {
      key: 'value'
    })
    assert.equal(accessor(self, privates, 'key', ['new value']), self)
    assert.equal(privates.get(self).key, 'new value')
  })
})
