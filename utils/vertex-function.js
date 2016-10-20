const vertexFunction = (f, graph) => {
  return (u) => {
    return f({
      u,
      d: graph.vertex(u)
    })
  }
}

module.exports = vertexFunction
