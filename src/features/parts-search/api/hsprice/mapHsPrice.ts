import { isFilledGood } from './isFilledGood';
import type { FavoritGood, OfferRow, PartsBrand } from './types';

const fallbackPrice = (item: FavoritGood): number | null => {
  const price = Number(item.price);

  if (Number.isFinite(price) && price > 0) {
    return price;
  }

  return null;
};

const warehouseStock = (item: FavoritGood): number => {
  if (!Array.isArray(item.warehouses) || item.warehouses.length === 0) {
    return Number(item.count) || 0;
  }

  return item.warehouses.reduce((sum, warehouse) => {
    return sum + (Number(warehouse.stock) || 0);
  }, 0);
};

const warehousePrice = (item: FavoritGood): number | null => {
  if (!Array.isArray(item.warehouses) || item.warehouses.length === 0) {
    return fallbackPrice(item);
  }

  const prices = item.warehouses
    .map((warehouse) => Number(warehouse.price))
    .filter((price) => Number.isFinite(price) && price > 0);

  if (prices.length === 0) {
    return fallbackPrice(item);
  }

  return Math.min(...prices);
};

export const toOfferRow = (item: FavoritGood, isAnalog: boolean): OfferRow => {
  return {
    id: `${item.brand ?? ''}-${item.number ?? ''}-${item.goodsID ?? ''}-${isAnalog ? 'a' : 'o'}`,
    name: item.name || 'Без названия',
    brand: item.brand || '—',
    number: item.number || '—',
    price: warehousePrice(item),
    stock: warehouseStock(item),
    isAnalog: Boolean(isAnalog),
  };
};

export const uniqueBrands = (goods: FavoritGood[]): PartsBrand[] => {
  const seen = new Set<string>();

  return goods.flatMap((item) => {
    const brand = String(item.brand ?? '').trim();

    if (!brand || seen.has(brand)) {
      return [];
    }

    seen.add(brand);

    return [
      {
        brand,
        name: item.name ?? '',
        number: item.number ?? '',
      },
    ];
  });
};

export const flattenOffers = (goods: FavoritGood[]): OfferRow[] => {
  return goods.flatMap((item) => {
    const origin = toOfferRow(item, false);

    if (!Array.isArray(item.analogues)) {
      return [origin];
    }

    const analogues = item.analogues.filter(isFilledGood).map((analog) => {
      return toOfferRow(analog, true);
    });

    return [origin, ...analogues];
  });
};
