'use strict';

import expect from 'expect.js';
import graph from '../../../src/graph';
import priority from '../../../src/layout/position-assignment/priority';

describe('priority(g, h1, h2, positions, sizes)', () => {
  it('returns x2', () => {
    var g = graph();
    var u1 = g.addVertex();
    var u2 = g.addVertex();
    var u3 = g.addVertex();
    var u4 = g.addVertex();
    var u5 = g.addVertex();
    var u6 = g.addVertex();
    var u7 = g.addVertex();
    var u8 = g.addVertex();
    var u9 = g.addVertex();
    var v1 = g.addVertex();
    var v2 = g.addVertex();
    var v3 = g.addVertex();
    var v4 = g.addVertex();
    g.addEdge(u1, v1);
    g.addEdge(u2, v1);
    g.addEdge(u3, v1);
    g.addEdge(u4, v1);
    g.addEdge(u5, v1);
    g.addEdge(u6, v2);
    g.addEdge(u7, v3);
    g.addEdge(u8, v3);
    g.addEdge(u9, v3);
    g.addEdge(u7, v4);
    g.addEdge(u9, v4);
    var h1 = [u1, u2, u3, u4, u5, u6, u7, u8, u9];
    var h2 = [v1, v2, v3, v4];
    var positions = {
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
    };
    var sizes = {
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
    };
    priority(g, h1, h2, positions, sizes);
    expect(positions).to.be.eql({
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
    });
  });
});
