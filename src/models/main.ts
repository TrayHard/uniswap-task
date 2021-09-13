export type TCoin = {
  logo: string,
  equivalent: number,
  fullname: string,
}

export type TToken = {
  name: string,
  decimals: number,
  symbol: string,
  address: string,
  chainId: number,
  tags: string[]
}

export type TTag = {
  name: string,
  description: string,
}