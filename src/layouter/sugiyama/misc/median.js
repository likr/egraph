'use strict';

const median = (g, v, inverse=false) => {
  const vertices = Array.from(inverse ? g.outVertices(v) : g.inVertices(v));
  vertices.sort((u1, u2) => g.vertex(u1).order - g.vertex(u2).order);
  const index = (vertices.length - 1) / 2;
  return {
    left: vertices[Math.floor(index)],
    right: vertices[Math.ceil(index)]
  };
};

export default median;
