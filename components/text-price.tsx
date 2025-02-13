import { PriceRowContainer, LabelContainer, Label, Price } from './styles/text-price.styles';
import { useFormattedPrice } from '@/hooks/useFormattedPrice';
import { useCurrency } from '@/contexts/CurrencyContext';

interface TextPriceProps {
  label: string;
  price: number | string;
  approximateSymbol?: boolean;
  removePriceFormat?: boolean;
  isEven?: boolean;
}

export const TextPrice = ({
  label,
  price,
  approximateSymbol = false,
  removePriceFormat = false,
  isEven = false
}: TextPriceProps) => {
  const { currency } = useCurrency();
  const formattedPrice = useFormattedPrice(price, currency);

  return (
    <PriceRowContainer isEven={isEven}>
      <LabelContainer>
        <Label>{label}</Label>
      </LabelContainer>
      <Price>{approximateSymbol ? '≈ ' : ''}{removePriceFormat ? price : formattedPrice}</Price>
    </PriceRowContainer>
  );
}; 