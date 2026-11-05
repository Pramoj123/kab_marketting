// Helpers shared by option lists. Plain data and no imports, so Keystatic and Zod can both use it.

type Option = { readonly value: string; readonly label: string };

/** Values of an option list as the non-empty tuple that `z.enum` expects. */
export const optionValues = <const T extends readonly [Option, ...Option[]]>(options: T) =>
  options.map((option) => option.value) as unknown as [T[number]['value'], ...T[number]['value'][]];
