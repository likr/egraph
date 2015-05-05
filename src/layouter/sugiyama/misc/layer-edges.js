'use strict';

const layerEdges = (g, h1, h2) => {
  const result = [];
  for (const v of h2) {
    for (const u of g.inVertices(v)) {
      result.push([u, v]);
    }
  }
  return result;
};

export default layerEdges;
