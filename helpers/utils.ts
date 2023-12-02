export const to = <T, E = Error>(promise: Promise<T>): Promise<{ error: E } | { result: T }> => promise.then((result: T) => ({ result })).catch((error: E) => ({ error }));

export const moneyFormatter = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
  maximumFractionDigits: 7,
});

export const numberFormatter = new Intl.NumberFormat('en-US');
