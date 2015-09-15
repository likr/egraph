import accessor from "../../../utils/accessor";

const privates = new WeakMap();

class UserDefined {
  constructor() {
    privates.set(this, {
      f: () => 0
    });
  }

  call(g) {
    const f = privates.get(this).f;
    const layers = {};
    for (const u of g.vertices()) {
      layers[u] = f(u);
    }
    return layers;
  }

  f() {
    return accessor(this, privates, 'f', arguments);
  }
}

export default UserDefined;
