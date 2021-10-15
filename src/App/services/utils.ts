import { coins, Token } from "../../config";

export function formatAddress(wallet: string): string {
  return ellideMiddle(wallet, 24);
}

export function ellideMiddle(str: string, maxOutLen: number): string {
  if (str.length <= maxOutLen) {
    return str;
  }
  const ellide = "…";
  const frontLen = Math.ceil((maxOutLen - ellide.length) / 2);
  const tailLen = Math.floor((maxOutLen - ellide.length) / 2);
  return str.slice(0, frontLen) + ellide + str.slice(str.length - tailLen, str.length);
}

export function getTokenConfig(denom: string): Token {
  return coins.find(c => c.denom === denom)!;
}

export function formatPrice(price: {amount: string, denom: string}): string {
  const coin = getTokenConfig(price.denom);
  const amount = parseInt(price.amount) / Math.pow(10, coin.decimals);

  return amount + " " + coin.name;
}

export function toMinDenom(amount: number, denom: string): string {
  const coin = getTokenConfig(denom);
  return Math.ceil(amount * Math.pow(10, coin.decimals)).toString();
}
