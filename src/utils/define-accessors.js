'use strict';

const accessor = (self, privates, key) => {
  return () => {
    return function (arg) {
      if (arguments.length === 0) {
        return privates[key];
      }
      privates[key] = arg;
      return self;
    };
  };
};

const defineAccessors = (self, privates, accessors) => {
  for (const key in accessors) {
    privates[key] = accessors[key];
    Object.defineProperty(self, key, {
      get: accessor(self, privates, key)
    });
  }
};

export default defineAccessors;
