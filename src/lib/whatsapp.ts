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

/** "Hi! I'd like to order the Brownie Box: Box of 6, Nutella". Blank choices are left out. */
export function orderMessage(productName: string, choices: readonly string[] = []) {
  const picked = choices.map((choice) => choice.trim()).filter(Boolean);
  const base = `Hi! I'd like to order the ${productName}`;
  return picked.length > 0 ? `${base}: ${picked.join(', ')}` : base;
}

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
