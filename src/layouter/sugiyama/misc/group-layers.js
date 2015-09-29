const groupLayers = (g, layers, allowEmptyLayer) => {
  const result = [];
  for (const u of g.vertices()) {
    const layer = layers[u];
    if (result[layer] === undefined) {
      result[layer] = [];
    }
    result[layer].push(u);
  }
  if (allowEmptyLayer) {
    for (let i = 0; i < result.length; ++i) {
      if (result[i] === undefined) {
        result[i] = [];
      }
    }
    return result;
  } else {
    return result.filter((h) => h !== undefined);
  }
};

export default groupLayers;
