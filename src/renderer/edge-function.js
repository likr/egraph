'use strict';

const edgeFunction = (f) => {
  return function (d, i) {
    const arg = {
      u: d.source.key,
      v: d.target.key,
      ud: d.source.data,
      vd: d.target.data,
      d: d.data
    };
    return f.call(this, arg, i);
  };
};

export default edgeFunction;
