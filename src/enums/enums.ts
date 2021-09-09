export enum ECurrencyList {
  ETH = 'ETH',
  WBTC = 'WBTC',
  USDT = 'USDT',
  LINK = 'LINK',
}

export const CURRENCIES: {[key in ECurrencyList]: { logo: string }} = {
  ETH: {
    logo: 'ETH.png',
  },
  WBTC: {
    logo: 'WBTC.svg',
  },
  USDT: {
    logo: 'USDT.png',
  },
  LINK: {
    logo: 'LINK.png',
  },
}