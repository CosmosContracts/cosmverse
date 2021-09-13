import { coinsList } from "../../config";

export function formatAddress(wallet: string): string {
  const first = wallet.substring(0, 10);
  const last = wallet.substring(wallet.length - 8);

  return first+"..."+last;
}

export function formatPrice(price: {amount: string, denom: string}): string {
  const coinConfig = (coinsList as any)[price.denom];
  const amount = parseInt(price.amount) / Math.pow(10, coinConfig.decimals);

  return amount + " " + coinConfig.name;
}
