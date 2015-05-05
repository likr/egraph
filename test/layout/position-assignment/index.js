'use strict';

import expect from 'expect.js';
import Graph from '../../../src/graph';
import priority from '../../../src/layout/position-assignment/priority';

describe('priority(g, h1, h2, positions, sizes)', () => {
  it('returns x2', () => {
    const graph = new Graph();
    const u1 = graph.addVertex();
    const u2 = graph.addVertex();
    const u3 = graph.addVertex();
    const u4 = graph.addVertex();
    const u5 = graph.addVertex();
    const u6 = graph.addVertex();
    const u7 = graph.addVertex();
    const u8 = graph.addVertex();
    const u9 = graph.addVertex();
    const v1 = graph.addVertex();
    const v2 = graph.addVertex();
    const v3 = graph.addVertex();
    const v4 = graph.addVertex();
    graph.addEdge(u1, v1);
    graph.addEdge(u2, v1);
    graph.addEdge(u3, v1);
    graph.addEdge(u4, v1);
    graph.addEdge(u5, v1);
    graph.addEdge(u6, v2);
    graph.addEdge(u7, v3);
    graph.addEdge(u8, v3);
    graph.addEdge(u9, v3);
    graph.addEdge(u7, v4);
    graph.addEdge(u9, v4);
    var h1 = [u1, u2, u3, u4, u5, u6, u7, u8, u9];
    var h2 = [v1, v2, v3, v4];
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
    };
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
    };
    priority(graph, h1, h2, positions, sizes);
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
