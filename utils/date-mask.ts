import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export function dateMask(value: string): string {
  // Remove any non-digit characters
  const digits = value.replace(/\D/g, '');

  // Apply mask only if we have digits
  if (digits.length) {
    const masked = digits.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    return masked;
  }

  return value;
}

export function isValidDate(value: string): boolean {
  // Check if the string matches the MM/DD/YYYY format
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    return false;
  }

  // Parse and validate the date using dayjs
  const date = dayjs(value, 'MM/DD/YYYY', true);
  return date.isValid();
}

export function formatAndValidateDate(value: string): {
  formattedValue: string;
  isValid: boolean;
} {
  const maskedValue = dateMask(value);
  const valid = maskedValue.length === 10 ? isValidDate(maskedValue) : false;

  return {
    formattedValue: maskedValue,
    isValid: valid,
  };
}




