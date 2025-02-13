import { useMemo } from 'react';

const currencyConfig = {
  USD: {
    locale: 'en-US',
    currency: 'USD',
  },
  BRL: {
    locale: 'pt-BR',
    currency: 'BRL',
  },
};

type SupportedCurrency = keyof typeof currencyConfig;

export function useFormattedPrice(price: number | null | undefined, currency: SupportedCurrency) {
  const formattedPrice = useMemo(() => {
    const config = currencyConfig[currency];
    const currentPrice = price ?? 0;

    // For very small numbers (less than 0.0001), use scientific notation
    if (currentPrice < 0.0001) {
      return currentPrice.toLocaleString(config.locale, {
        style: 'currency',
        currency: config.currency,
        minimumSignificantDigits: 1,
        maximumSignificantDigits: 4
      });
    }

    // For small numbers (less than 0.01), use 4 decimal places
    if (currentPrice < 0.01) {
      return currentPrice.toLocaleString(config.locale, {
        style: 'currency',
        currency: config.currency,
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
      });
    }

    // For regular numbers, use standard 2 decimal places
    return currentPrice.toLocaleString(config.locale, {
      style: 'currency',
      currency: config.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }, [price, currency]);

  return formattedPrice;
} 