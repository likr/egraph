const edgeFunction = (f, graph) => {
  return (u, v) => {
    return f({
      u,
      v,
      ud: graph.vertex(u),
      vd: graph.vertex(v),
      d: graph.edge(u, v)
    })
  }
}

module.exports = edgeFunction
