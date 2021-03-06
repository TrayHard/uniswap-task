export type TToken = {
  name: string;
  decimals: number;
  symbol: string;
  address: string;
  chainId: number;
  tags?: string[];
  logoURI?: string;
  extensions?: Record<string, string>;
};

export type TTag = {
  name: string;
  description: string;
};

export type TTokenList = {
  name: string;
  logoURI?: string;
  keywords?: string[];
  tags?: Record<string, TTag>;
  tokens: TToken[];
  timestamp: string;
  version: Record<string, number>;
  active: boolean;
};

export type TWallet = {
  address: string;
};

export type TQuote = {
  quote: number;
};
