export const getString = <T, K extends keyof T>(obj: T, keys: K[]) => {
  return keys.reduce((o, k) => {
    o[k] = obj[k].toString()
    return o
  }, {} as Record<K, string>)
}

export const getAddress = <T, K extends keyof T>(obj: T, keys: K[]) => {
  return keys.reduce((o, k) => {
    o[k] = (obj[k] as any).toLowerCase()
    return o
  }, {} as Record<K, string>)
}
