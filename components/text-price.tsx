import { PriceRowContainer, LabelContainer, Label, Price } from './styles/text-price.styles';
import { PriceDisplay } from './price-display';
import React from 'react';

interface TextPriceProps {
  label: string;
  price: number | string;
  approximateSymbol?: boolean;
  removePriceFormat?: boolean;
  isEven?: boolean;
}

export const TextPrice = React.memo(({
  label,
  price,
  approximateSymbol = false,
  removePriceFormat = false,
  isEven = false
}: TextPriceProps) => {
  return (
    <PriceRowContainer isEven={isEven}>
      <LabelContainer>
        <Label>{label}</Label>
      </LabelContainer>
      <Price>
        <PriceDisplay
          value={price}
          approximateSymbol={approximateSymbol}
          removePriceFormat={removePriceFormat}
        />
      </Price>
    </PriceRowContainer>
  );
}); 