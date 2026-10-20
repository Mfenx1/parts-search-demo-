import type { OfferRow, PartsBrand } from '../../api';

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type SearchOffersArg = {
  number: string;
  brand: string;
};

export type PartsState = {
  article: string;
  brands: PartsBrand[];
  brandsStatus: RequestStatus;
  brandsError: string;
  selectedBrand: string;
  offers: OfferRow[];
  offersStatus: RequestStatus;
  offersError: string;
};

export type PartsRootState = {
  parts: PartsState;
};
