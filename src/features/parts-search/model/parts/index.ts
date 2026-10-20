export { store } from './store';
export type { AppDispatch, RootState } from './store';
export { useAppDispatch, useAppSelector } from './typedHooks';
export {
  partsReducer,
  resetSearch,
  searchBrands,
  searchOffers,
  setArticle,
} from './partsSlice';
export {
  selectArticle,
  selectBrands,
  selectBrandsError,
  selectBrandsStatus,
  selectOffers,
  selectOffersError,
  selectOffersStatus,
  selectSelectedBrand,
} from './partsSelectors';
export type { PartsState, RequestStatus, SearchOffersArg } from './partsTypes';
