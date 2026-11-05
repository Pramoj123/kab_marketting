# Design system

Kookies & Brookies uses a **soft-futurist editorial** look: a warm ivory page, deep navy ink, generous space and large serif headlines. Brand blue is the one action colour, and brand pink is kept for small marks. The aim is a site that still looks current in four to five years. It gets there through restraint, not effects.

Tokens live only in `src/styles/global.css`. Components use them through `src/components/ui/*.variants.ts`. Sources: the `design-taste-frontend` and `claude` skills (see CLAUDE.md, Design skills), adapted to this repo.

## Tokens

Tailwind's stock colours, font sizes, fonts, radii, shadows and container sizes are reset. Only the utilities below exist; `text-sm`, `bg-white` or `shadow-md` generate nothing.

| Group      | Utilities                                                                                                                                                         | Notes                                                                                       |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Grounds    | `bg-surface` (ivory), `bg-surface-raised` (cards, fields), `bg-blush`, `bg-mist`                                                                                  | Never pure white.                                                                           |
| Ink        | `text-ink` (12.7:1), `text-ink-muted` (6.5:1), `border-line`, `border-line-strong`                                                                                | Lines are the ink at 14% and 28%.                                                           |
| Brand blue | `brand-50`, `100`, `600`, `700`, `800`, `text-on-brand`                                                                                                           | 600 is the primary button, links and focus. White on 600 is 5.3:1.                          |
| Pink       | `accent-50`, `100`, `300`, `500`, `600`                                                                                                                           | 500 is decoration only (2.8:1). 600 is the only pink allowed for text, and large text only. |
| Status     | `success`, `warning`, `danger`                                                                                                                                    | 4.9:1 or more on every ground.                                                              |
| Gradients  | `bg-aurora`, `bg-aurora-band`                                                                                                                                     | See the rules below.                                                                        |
| Fonts      | `font-display` (Instrument Serif 400), `font-sans` (Instrument Sans 400 to 600)                                                                                   | Self-hosted through the Astro Fonts API (`astro.config.mjs`).                               |
| Type       | `text-display` 40 to 72, `text-h1` 36 to 56, `text-h2` 30 to 48, `text-h3` 24 to 28, `text-lead` 18 to 20, `text-body` 16, `text-small` 14, `text-label` 13       | Fluid between 390 and 1440px wide; each size sets its own line height and tracking.         |
| Widths     | `max-w-page` 1280, `max-w-narrow` 768, `max-w-measure` 62ch                                                                                                       | The container adds the gutter outside `max-w-page`.                                         |
| Spacing    | Tailwind's 4px scale, plus `section-top` 96 to 120, `section-bottom` 48 to 72, `gutter` 24 to 80, `stack` 32 to 48, `nav` 56 to 72, `control-sm` 40, `control` 48 | Use with any spacing utility: `pt-section-top`, `px-gutter`, `gap-stack`, `h-control`.      |
| Radius     | `rounded-control` 8, `rounded-panel` 12, `rounded-card` 20, `rounded-full` for buttons and badges                                                                 |                                                                                             |
| Motion     | `ease-soft`; default transition 200ms on `ease-soft`                                                                                                              | Everything rests under `prefers-reduced-motion`.                                            |

When a token is added or renamed, also update `src/components/ui/theme-tokens.ts`. `tailwind-merge` needs those names, and `tests/unit/theme-tokens.test.ts` fails if they drift.

## Rules

Use "must" for hard rules and "should" for defaults.

- The interface must stay 90 to 95% neutral. Colour should come from the photographs.
- There must be exactly one filled button (`intent="primary"`) per view, for the main action: order, or send on WhatsApp. Everything else is `secondary`. No third button style, no gradient, ghost or shadowed buttons.
- Pink must never be used for body text. A pink mark should take less than 3% of a screen.
- Gradients: `bg-aurora` only on the hero (`Section tone="aurora"`), and `bg-aurora-band` only on one brand band per page (`Section tone="band"`). Never put a gradient over a photograph.
- No shadows, blur, glass or glow. Surfaces separate by ground and a 1px hairline.
- Headlines use the display face at weight 400. Size and tracking carry them, never bold. Text uses 400 and 500 only.
- Write in sentence case everywhere. No tracked capitals. Nothing under 13px. Reading text is 16px or more, at most 62 characters a line.
- Hover layer: a linked card lifts 2px, a product photo zooms 1.03 inside its frame, buttons step up 1px and press down. No tilt, parallax, carousels or scroll-triggered reveals.
- Never violet or lavender (OKLCH hue 270 to 330). Brand blue sits at hue 262.
- No dark mode. The skill keeps dark grounds for tech sites.

## Section grounds

| Section               | Tone      |
| --------------------- | --------- |
| Hero                  | `aurora`  |
| Products              | `default` |
| Features              | `mist`    |
| Steps                 | `blush`   |
| FAQ                   | `blush`   |
| Call to action        | `band`    |
| Contact, custom order | `default` |

Two neighbouring sections should not share a ground.

## The main action and the shell

- **The main action is "Order on WhatsApp".** It comes from `mainAction()` in `src/lib/actions.ts` and reads the same, word for word, in the header button, the phone bar, the footer close and the home hero.
  - Until a WhatsApp number is set in Site settings, it falls back to "See the menu".
  - Until then, the header button and the phone bar are hidden.
- **Editors can open WhatsApp from any CMS link** by typing `whatsapp` as the link URL.
- **Product cards say "Order this bake"** in the secondary look, so the one filled button stays the main action.
  - The card's size, flavour and egg pickers go into the WhatsApp message.
  - Before the number is set, the options show as text, not pickers.
- **Header:** sticky, opaque, with a hairline.
  - From 1024px: logo, nav words, order button.
  - From 640 to 1023px: logo, order button, Menu.
  - Under 640px: logo and Menu, plus the fixed phone bar at the foot. Its spacer keeps the footer clear of it.
- **Menu sheet:** a native `<dialog>` (Esc closes it, the page behind is inert), with 56px rows.
- **Buttons:**
  - One height (48px) for every md and lg button; sm (40px) for the header and inside cards.
  - On phones every md and lg button runs the full column width.
- **Narrow content** (forms, FAQ) uses `Stack width="narrow"`, left-aligned on the page edge, never a centred column.
- **FAQs are open in full.** No accordion.
- **Required fields:** form errors show under the field in `text-danger` with `aria-invalid="true"`, and focus moves to the first error. Optional fields say "(optional)".

## QA checklist

- [ ] `pnpm check:styles` passes: no inline `style`, colour literals or arbitrary values outside `src/styles`.
- [ ] Only one primary button is visible in any view.
- [ ] There is no gradient outside the hero and the one band.
- [ ] Text contrast is 4.5:1 or more everywhere, and 7:1 for reading text.
- [ ] Keyboard focus shows the brand-blue ring on every link, button and field.
- [ ] At 390px wide: one column, nothing scrolls sideways, buttons are 40px or taller.
- [ ] Under reduced motion, nothing moves.
