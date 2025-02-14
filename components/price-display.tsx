import { useFormattedPrice } from "@/hooks/useFormattedPrice";
import { useCurrency } from "@/contexts/CurrencyContext";
import React, { memo, Fragment } from "react";

export const PriceDisplay = memo(({
  value,
  approximateSymbol = false,
  removePriceFormat = false
}: {
  value: number | string;
  approximateSymbol?: boolean;
  removePriceFormat?: boolean;
}) => {
  const { currency } = useCurrency();
  const formattedPrice = useFormattedPrice(typeof value === 'number' ? value : 0, currency);

  return <Fragment>{approximateSymbol ? '≈ ' : ''}{removePriceFormat ? value : formattedPrice}</Fragment>;
}); 