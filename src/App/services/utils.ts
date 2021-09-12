export function formatAddress(wallet: string): string {
  const first = wallet.substring(0, 10);
  const last = wallet.substring(wallet.length - 8);

  return first+"..."+last;
}
