const accessor = (self, privates, key, args) => {
  if (args.length === 0) {
    return privates.get(self)[key]
  }
  privates.get(self)[key] = args[0]
  return self
}

module.exports = accessor
