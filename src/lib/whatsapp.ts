const DEFAULT_COUNTRY_CODE = '91';
const MIN_DIGITS = 10;
const MAX_DIGITS = 15;

/**
 * Digits only, with the country code. A 10 digit number gets the default country code.
 * Returns an empty string when the number cannot be a phone number.
 */
export function normalizePhone(raw: string, countryCode = DEFAULT_COUNTRY_CODE) {
  const digits = raw.replace(/\D/g, '').replace(/^0+/, '');
  const full = digits.length === MIN_DIGITS ? `${countryCode}${digits}` : digits;
  return full.length >= MIN_DIGITS && full.length <= MAX_DIGITS ? full : '';
}

/** A wa.me link with the message filled in, or null when there is no usable number. */
export function whatsappLink(number: string, message: string) {
  const phone = normalizePhone(number);
  return phone ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}` : null;
}

export const orderMessage = (productName: string) => `Hi! I'd like to order the ${productName}`;

export interface CustomOrderBrief {
  name?: string;
  product?: string;
  occasion?: string;
  date?: string;
  flavour?: string;
  size?: string;
  message?: string;
  notes?: string;
}

const BRIEF_LABELS: [keyof CustomOrderBrief, string][] = [
  ['name', 'Name'],
  ['product', 'Product'],
  ['occasion', 'Occasion'],
  ['date', 'Needed on'],
  ['flavour', 'Flavour'],
  ['size', 'Size'],
  ['message', 'Message on the cake'],
  ['notes', 'Other details'],
];

/** One line per filled-in field. Blank fields are left out. */
export function customOrderMessage(brief: CustomOrderBrief) {
  const lines = BRIEF_LABELS.flatMap(([key, label]) => {
    const value = brief[key]?.trim();
    return value ? [`${label}: ${value}`] : [];
  });
  return ["Hi! I'd like to place a custom order.", ...lines].join('\n');
}
