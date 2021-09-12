export enum ECoinsList {
  ETH = 'ETH',
  WBTC = 'WBTC',
  USDT = 'USDT',
  LINK = 'LINK',
}

export type TCoin = {
  logo: string,
  equivalent: number,
}

export const COINS: {[key in ECoinsList]: TCoin} = {
  ETH: {
    logo: 'ETH.png',
    equivalent: 3454.51,
  },
  WBTC: {
    logo: 'WBTC.svg',
    equivalent: 46374.4,
  },
  USDT: {
    logo: 'USDT.png',
    equivalent: 0.998979,
  },
  LINK: {
    logo: 'LINK.png',
    equivalent: 28.4501,
  },
}