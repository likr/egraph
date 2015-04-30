'use strict';

const horizontalCompaction = (g, layers, {rtol=false, btot=false}) => {
  const orderNonZero = node => rtol
    ? node.order < layers[node.layer].length - 1
    : node.order > 0;
  const predecessor = rtol
    ? node => layers[node.layer][node.order + 1]
    : node => layers[node.layer][node.order - 1];

  const placeBlock = (v) => {
    const vNode = g.vertex(v);
    if (vNode.x !== null) {
      return;
    }
    vNode.x = 0;
    let w = v;
    do {
      const wNode = g.vertex(w);
      if (orderNonZero(wNode)) {
        const p = predecessor(wNode),
              pNode = g.vertex(p),
              u = pNode.root,
              uNode = g.vertex(u);
        placeBlock(u);
        if (vNode.sink === v) {
          vNode.sink = uNode.sink;
        }
        if (vNode.sink === uNode.sink) {
          vNode.x = Math.max(vNode.x, uNode.x + (pNode.width + wNode.width) / 2);
        } else {
          const uSinkNode = g.vertex(uNode.sink);
          uSinkNode.shift = Math.min(uSinkNode.shift, vNode.x - uNode.x - (pNode.width + wNode.width) / 2);
        }
      }
      w = wNode.align;
    } while (w !== v);
  };

  for (const u of g.vertices()) {
    const uNode = g.vertex(u);
    uNode.sink = u;
    uNode.shift = Infinity;
    uNode.x = null;
  }
  for (const u of g.vertices()) {
    if (g.vertex(u).root === u) {
      placeBlock(u);
    }
  }
  for (const u of g.vertices()) {
    const uNode = g.vertex(u);
    uNode.x = g.vertex(uNode.root).x;
  }
  for (const u of g.vertices()) {
    const uNode = g.vertex(u);
    const shift = g.vertex(g.vertex(uNode.root).sink).shift;
    if (shift < Infinity) {
      uNode.x += shift;
    }
  }
};

export default horizontalCompaction;
