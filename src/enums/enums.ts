import { TCoin } from "@/models/main";

export enum ECoinsList {
  ETH = 'ETH',
  WBTC = 'WBTC',
  USDT = 'USDT',
  LINK = 'LINK',
}

export const COINS: {[key in ECoinsList]: TCoin} = {
  ETH: {
    logo: 'ETH.png',
    equivalent: 3454.51,
    fullname: 'Ether',
  },
  WBTC: {
    logo: 'WBTC.svg',
    equivalent: 46374.4,
    fullname: 'Wrapped Bitcoin',
  },
  USDT: {
    logo: 'USDT.png',
    equivalent: 0.998979,
    fullname: 'Tether',
  },
  LINK: {
    logo: 'LINK.png',
    equivalent: 28.4501,
    fullname: 'Chainlink',
  },
}