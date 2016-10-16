const compareClev = (layer1, layer2) => {
  const minLen = Math.min(layer1.length, layer2.length)
  for (let i = 0; i < minLen; ++i) {
    if (layer1[i] < layer2[i]) {
      return -1
    } else if (layer1[i] > layer2[i]) {
      return 1
    }
  }
  if (layer1.length < layer2.length) {
    return -1
  } else if (layer1.length > layer2.length) {
    return 1
  }
  return 0
}

module.exports = compareClev
