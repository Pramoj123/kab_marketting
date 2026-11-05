// Tile shapes for the product mosaic. Every pattern fills whole rows on a 4-column grid
// (desktop) and a 2-column grid (tablet), so no row is left with a gap.
//   feature: 2 columns x 2 rows   tall: 1 x 2   tile: 1 x 1   wide: a full row
export type TileShape = 'feature' | 'tall' | 'tile' | 'wide';

const PATTERNS: Record<number, TileShape[]> = {
  1: ['wide'],
  2: ['feature', 'feature'],
  3: ['feature', 'tall', 'tall'],
  4: ['feature', 'tall', 'tile', 'tile'],
  5: ['feature', 'tile', 'tile', 'tile', 'tile'],
};

/** Group sizes of at most 5. Six and seven split so no group is a lone wide tile. */
function chunkSizes(count: number): number[] {
  if (count <= 0) return [];
  if (count <= 5) return [count];
  if (count === 6) return [3, 3];
  if (count === 7) return [4, 3];
  return [5, ...chunkSizes(count - 5)];
}

/** One shape per item, in order. */
export const mosaicShapes = (count: number): TileShape[] =>
  chunkSizes(count).flatMap((size) => PATTERNS[size]);

export interface MosaicTile {
  shape: TileShape;
  /** Placed after its group's other tiles, so the feature sits on the right. */
  last: boolean;
}

/**
 * Shapes for one group on a page with several groups (the menu). Every second group of three
 * mirrors (two tall tiles, then the feature), so neighbouring categories do not repeat.
 */
export function mosaicLayout(count: number, groupIndex = 0): MosaicTile[] {
  const mirror = count === 3 && groupIndex % 2 === 1;
  return mosaicShapes(count).map((shape) => ({ shape, last: mirror && shape === 'feature' }));
}

/** Grid cells a shape covers on the 4-column grid. Used to check that rows are full. */
export const shapeCells = (shape: TileShape) => ({ feature: 4, tall: 2, tile: 1, wide: 4 })[shape];
