import { coinsList } from "../../config";

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

export function formatPrice(price: {amount: string, denom: string}): string {
  const coinConfig = (coinsList as any)[price.denom];
  const amount = parseInt(price.amount) / Math.pow(10, coinConfig.decimals);

  return amount + " " + coinConfig.name;
}

export function toMinDenom(amount: number, denom: string): string {
  const coinConfig = (coinsList as any)[denom];
  return Math.ceil(amount * Math.pow(10, coinConfig.decimals)).toString();
}

export function* getListCoins() {
  for (const key in Object.keys(coinsList)) {
    const element = (coinsList as any)[key];
    yield {
      value: key,
      text: element.name
    };
  }
}
