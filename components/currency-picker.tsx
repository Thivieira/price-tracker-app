import { Currency, useCurrency } from '@/contexts/CurrencyContext';
import { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';


export default function CurrencyPicker() {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(currency);
  const [items, setItems] = useState([
    { label: 'BRL', value: 'BRL' },
    { label: 'USD', value: 'USD' }
  ]);

  useEffect(() => {
    setCurrency(value as Currency);
  }, [value]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      placeholder="Select Currency"
      setItems={setItems}
      style={{ minHeight: 40 }}
    />
  );
}
