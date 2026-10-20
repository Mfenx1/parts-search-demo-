export type FavoritWarehouse = {
  code?: string;
  id?: string;
  own?: boolean;
  shipmentDate?: string;
  price?: number;
  stock?: number;
  notRefund?: boolean;
};

export type FavoritGood = {
  goodsID?: string;
  brand?: string;
  number?: string;
  name?: string;
  count?: number;
  price?: number;
  rate?: number;
  analogues?: FavoritGood[];
  warehouses?: FavoritWarehouse[];
  notRefund?: boolean;
};

export type FavoritPriceResponse = {
  goods?: FavoritGood[];
  error?: string;
};

export type FetchHsPriceParams = {
  number: string;
  brand?: string;
  analogues?: boolean;
};

export type PartsBrand = {
  brand: string;
  name: string;
  number: string;
};

export type OfferRow = {
  id: string;
  name: string;
  brand: string;
  number: string;
  price: number | null;
  stock: number;
  isAnalog: boolean;
};
