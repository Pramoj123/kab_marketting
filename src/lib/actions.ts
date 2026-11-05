// The site's one main action and how CMS links resolve to it.
import { whatsappLink } from './whatsapp.ts';

/** Reads the same in the header, hero, phone bar and footer. */
export const MAIN_ACTION_LABEL = 'Order on WhatsApp';
export const ORDER_MESSAGE = "Hi! I'd like to place an order";
/** Editors type this as a link's URL to open WhatsApp with the order message. */
export const WHATSAPP_HREF = 'whatsapp';
/** Used instead of WhatsApp until the number is set in site settings. */
export const MENU_ACTION = { label: 'See the menu', href: '/menu/' } as const;

export interface Action {
  label: string;
  href: string;
}

/** Order on WhatsApp, or null while no WhatsApp number is set (ordering is not open yet). */
export function orderAction(whatsappNumber: string): Action | null {
  const href = whatsappLink(whatsappNumber, ORDER_MESSAGE);
  return href ? { label: MAIN_ACTION_LABEL, href } : null;
}

/** Order on WhatsApp, or See the menu while no WhatsApp number is set. */
export const mainAction = (whatsappNumber: string): Action =>
  orderAction(whatsappNumber) ?? { ...MENU_ACTION };

export const isWhatsappHref = (href: string) => href.trim().toLowerCase() === WHATSAPP_HREF;

/**
 * Turns CMS links into actions: drops blank ones, swaps `whatsapp` for the main action,
 * and drops a link that repeats an earlier target (the fallback can equal the second button).
 */
export function resolveActions(links: readonly Action[], whatsappNumber: string): Action[] {
  const resolved = links
    .filter((link) => link.label.trim() && link.href.trim())
    .map((link) => (isWhatsappHref(link.href) ? mainAction(whatsappNumber) : link));
  return resolved.filter(
    (link, index) => resolved.findIndex((other) => other.href === link.href) === index,
  );
}

/** One CMS link as an action, or null when it is blank. Every CMS button goes through this. */
export const resolveLink = (link: Action, whatsappNumber: string): Action | null =>
  resolveActions([link], whatsappNumber)[0] ?? null;

/** Links to another site open in a new tab. */
export const isExternal = (href: string) => /^https?:\/\//.test(href);
