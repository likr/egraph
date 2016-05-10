/* eslint-env mocha */
const assert = require('power-assert')
const Graph = require('../../../../graph')
const priority = require('../../../../layouter/sugiyama/position-assignment/priority')

describe('priority(g, h1, h2, positions, sizes)', () => {
  it('returns x2', () => {
    const h1 = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    const h2 = [9, 10, 11, 12]
    const [u1, u2, u3, u4, u5, u6, u7, u8, u9] = h1
    const [v1, v2, v3, v4] = h2
    const graph = new Graph()
      .addVertex(u1)
      .addVertex(u2)
      .addVertex(u3)
      .addVertex(u4)
      .addVertex(u5)
      .addVertex(u6)
      .addVertex(u7)
      .addVertex(u8)
      .addVertex(u9)
      .addVertex(v1)
      .addVertex(v2)
      .addVertex(v3)
      .addVertex(v4)
      .addEdge(u1, v1)
      .addEdge(u2, v1)
      .addEdge(u3, v1)
      .addEdge(u4, v1)
      .addEdge(u5, v1)
      .addEdge(u6, v2)
      .addEdge(u7, v3)
      .addEdge(u8, v3)
      .addEdge(u9, v3)
      .addEdge(u7, v4)
      .addEdge(u9, v4)
    const positions = {
      [u1]: {
        x: 1
      },
      [u2]: {
        x: 2
      },
      [u3]: {
        x: 3
      },
      [u4]: {
        x: 4
      },
      [u5]: {
        x: 5
      },
      [u6]: {
        x: 6
      },
      [u7]: {
        x: 7
      },
      [u8]: {
        x: 8
      },
      [u9]: {
        x: 9
      },
      [v1]: {
        x: 1
      },
      [v2]: {
        x: 2
      },
      [v3]: {
        x: 3
      },
      [v4]: {
        x: 4
      }
    }
    const sizes = {
      [v1]: {
        width: 1
      },
      [v2]: {
        width: 1
      },
      [v3]: {
        width: 1
      },
      [v4]: {
        width: 1
      }
    }
    priority(graph, h1, h2, positions, sizes)
    assert.deepEqual(positions, {
      [u1]: {
        x: 1
      },
      [u2]: {
        x: 2
      },
      [u3]: {
        x: 3
      },
      [u4]: {
        x: 4
      },
      [u5]: {
        x: 5
      },
      [u6]: {
        x: 6
      },
      [u7]: {
        x: 7
      },
      [u8]: {
        x: 8
      },
      [u9]: {
        x: 9
      },
      [v1]: {
        x: 3
      },
      [v2]: {
        x: 6
      },
      [v3]: {
        x: 8
      },
      [v4]: {
        x: 9
      }
    })
  })
})
