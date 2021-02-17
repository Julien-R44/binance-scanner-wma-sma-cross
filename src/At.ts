const AT = {
  computeWma(candles, length): number {
    let norm = 0
    let sum = 0
    let weight
    for (let i = 0; i < length; i++) {
      weight = (length - i) * length
      norm += weight
      sum += candles[i].close * weight
    }
    return sum / norm
  },

  computeSmma2(candles, length): number {
    let sum = 0
    for (let i = 0; i < length; i++) {
      sum += candles[i].close
    }
    return sum / length
  }
}

export default AT
