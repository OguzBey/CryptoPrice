export const to = <T, E = Error>(promise: Promise<T>): Promise<{ error: E } | { result: T }> =>
  promise.then((result: T) => ({ result })).catch((error: E) => ({ error }));

const moneyFormatter = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
  maximumFractionDigits: 7,
});

const moneyFormatterZeroDecimal = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

export const numberFormatter = new Intl.NumberFormat('en-US');

export const formatMoney = function (money: number) {
  if (Math.abs(money) < 1) return moneyFormatter.format(money);
  let fixedMoney = Number(money.toFixed(2));
  if (fixedMoney - Math.floor(fixedMoney) == 0) return moneyFormatterZeroDecimal.format(fixedMoney);
  return moneyFormatter.format(fixedMoney);
};

export const fixedString = function (strVal: string, maxLen = 10) {
  if (strVal.length > maxLen && strVal[maxLen - 1] != ' ') return `${strVal.slice(0, maxLen)}...`;
  else if (strVal.length > maxLen && strVal[maxLen - 1] == ' ') return `${strVal.slice(0, maxLen + 2)}...`;
  else return strVal;
};
