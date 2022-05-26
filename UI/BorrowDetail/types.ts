export type NFT = {
  name: string
  id: string
  src: string
  description?: string
  image?: string
  lock: {
    createTime: number
    expiration: number
    lockType: number
  }
}
