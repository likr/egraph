import cross from './cross'

const crossAll = (g, h) => {
  let sum = 0
  for (let i = 1; i < h.length; ++i) {
    sum += cross(g, h[i - 1], h[i])
  }
  return sum
}

export default crossAll
