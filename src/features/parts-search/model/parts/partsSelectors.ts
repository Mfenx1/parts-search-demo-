import type { PartsRootState } from './partsTypes';

export const selectArticle = (state: PartsRootState) => state.parts.article;

export const selectBrands = (state: PartsRootState) => state.parts.brands;

export const selectBrandsStatus = (state: PartsRootState) => state.parts.brandsStatus;

export const selectBrandsError = (state: PartsRootState) => state.parts.brandsError;

export const selectSelectedBrand = (state: PartsRootState) => state.parts.selectedBrand;

export const selectOffers = (state: PartsRootState) => state.parts.offers;

export const selectOffersStatus = (state: PartsRootState) => state.parts.offersStatus;

export const selectOffersError = (state: PartsRootState) => state.parts.offersError;
