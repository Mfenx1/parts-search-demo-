import type { FavoritGood } from './types';

export const isFilledGood = (item: FavoritGood | null | undefined): item is FavoritGood => {
  if (!item) {
    return false;
  }

  return Boolean(item.goodsID || item.brand || item.number);
};
