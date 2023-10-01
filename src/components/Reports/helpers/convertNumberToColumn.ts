export function convertNumberToColumn(num: number): string {
  let letters = '';
  while (num >= 0) {
    letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[num % 26] + letters;
    num = Math.floor(num / 26) - 1;
  }
  return letters;
}
