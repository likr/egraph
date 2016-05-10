const greedySwitch = (g, h1in, h2in, inverse = false) => {
  const hasEdge = inverse ? (u, v) => g.edge(v, u) : (u, v) => g.edge(u, v)
  const [h1, h2] = inverse ? [h2in, h1in] : [h1in, h2in]

  const c = (v1, v2) => {
    let count = 0
    for (let i = 0; i < h1.length; ++i) {
      const u2 = h1[i]
      if (hasEdge(u2, v2)) {
        for (let j = i + 1; j < h1.length; ++j) {
          const u1 = h1[j]
          if (hasEdge(u1, v1)) {
            count += 1
          }
        }
      }
    }
    return count
  }

  let improve
  do {
    improve = 0
    for (let i = 1; i < h2.length; ++i) {
      const v1 = h2[i - 1]
      const v2 = h2[i]
      const c12 = c(v1, v2)
      const c21 = c(v2, v1)
      if (c12 > c21) {
        [h2[i - 1], h2[i]] = [v2, v1]
        improve += c12 - c21
      }
    }
  } while (improve > 0)
}

module.exports = greedySwitch
