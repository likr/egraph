'use strict';

const priority = (g, h1, h2, positions, sizes, xMargin, inverse=false) => {
  const spaces = [[-Infinity, Infinity]];
  const allocateSpace = (x, width) => {
    const xs = spaces
      .map(([left, right]) => {
        if (right - left < width) {
          return NaN;
        } else if (left <= x && x <= right) {
          let dr = left - x + width / 2;
          if (dr > 0) {
            return x + dr;
          }
          let dl = x + width / 2 - right;
          if (dl > 0) {
            return x - dl;
          }
          return x;
        } else if (right < x) {
          return right - width / 2;
        } else {
          return left + width / 2;
        }
      });
    let minD = Infinity, index;
    for (let i = 0; i < spaces.length; ++i) {
      let xNew = xs[i],
          d = Math.abs(xNew - x);
      if (!isNaN(xNew) && d <= minD) {
        minD = d;
        index = i;
      }
    }
    const minX = xs[index],
          space = spaces[index],
          left = [space[0], minX - width / 2],
          right = [minX + width / 2, space[1]];
    spaces.splice(index, 1, left, right);
    return minX;
  };

  const vertices = inverse ? u => g.outVertices(u) : u => g.inVertices(u),
        degree = inverse ? u => g.outDegree(u) : u => g.inDegree(u);
  [h1, h2] = inverse ? [h2, h1] : [h1, h2];
  for (let u of h2) {
    let sum = 0;
    for (let v of vertices(u)) {
      sum += positions[v].x;
    }
    let x = +(sum / degree(u)).toFixed();
    positions[u] = {
      x: allocateSpace(isNaN(x) ? 0 : x, sizes[u].width + xMargin)
    };
  }
};

module.exports = priority;
