const priority = (g, h1in, h2in, positions, sizes, inverse = false) => {
  const inVertices = inverse ? (u) => g.outVertices(u) : (u) => g.inVertices(u)
  const degree = inverse ? (u) => g.outDegree(u) : (u) => g.inDegree(u)
  const h2 = inverse ? h1in : h2in

  const center = (u) => {
    let sum = 0
    for (let v of inVertices(u)) {
      sum += positions[v].x
    }
    return +(sum / degree(u)).toFixed()
  }

  const sorted = Array.from(h2)
  const p = {}
  const indices = {}
  const fixed = new Set()
  for (let i = 0; i < h2.length; ++i) {
    const u = h2[i]
    indices[u] = i
    p[u] = 0
    for (const v of inVertices(u)) {
      p[u] += g.vertex(u).dummy && g.vertex(v).dummy ? 10 : 1
    }
  }
  sorted.sort((u, v) => p[v] - p[u])

  for (const u of sorted) {
    if (degree(u) > 0) {
      const i = indices[u]
      let xBase = positions[u].x
      let xMoved = center(u)
      if (xMoved - xBase > 0) {
        let j
        for (j = i + 1; j < h2.length; ++j) {
          if (fixed.has(h2[j])) {
            break
          }
        }
        positions[u].x = xMoved
        for (let k = i + 1; k < j; ++k) {
          const v = h2[k - 1]
          const w = h2[k]
          const vRight = positions[v].x + sizes[v].width / 2
          const wLeft = positions[w].x - sizes[w].width / 2
          if (vRight > wLeft) {
            positions[w].x += vRight - wLeft
          } else {
            break
          }
        }
        if (j < h2.length) {
          for (let k = j - 1; k >= i; --k) {
            const v = h2[k]
            const w = h2[k + 1]
            const vRight = positions[v].x + sizes[v].width / 2
            const wLeft = positions[w].x - sizes[w].width / 2
            if (vRight > wLeft) {
              positions[v].x -= vRight - wLeft
            } else {
              break
            }
          }
        }
      } else {
        let j
        for (j = i - 1; j >= 0; --j) {
          if (fixed.has(h2[j])) {
            break
          }
        }
        positions[u].x = xMoved
        for (let k = i - 1; k > j; --k) {
          const v = h2[k]
          const w = h2[k + 1]
          const vRight = positions[v].x + sizes[v].width / 2
          const wLeft = positions[w].x - sizes[w].width / 2
          if (vRight > wLeft) {
            positions[v].x -= vRight - wLeft
          } else {
            break
          }
        }
        if (j >= 0) {
          for (let k = j + 1; k <= i; ++k) {
            const v = h2[k - 1]
            const w = h2[k]
            const vRight = positions[v].x + sizes[v].width / 2
            const wLeft = positions[w].x - sizes[w].width / 2
            if (vRight > wLeft) {
              positions[w].x += vRight - wLeft
            } else {
              break
            }
          }
        }
      }
      fixed.add(u)
    }
  }
}

module.exports = priority
