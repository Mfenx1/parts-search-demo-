import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchHsPrice, flattenOffers, uniqueBrands } from '../../api';
import type { PartsState, SearchOffersArg } from './partsTypes';

const initialState: PartsState = {
  article: '',
  brands: [],
  brandsStatus: 'idle',
  brandsError: '',
  selectedBrand: '',
  offers: [],
  offersStatus: 'idle',
  offersError: '',
};

export const searchBrands = createAsyncThunk('parts/searchBrands', async (number: string) => {
  const goods = await fetchHsPrice({ number });

  return uniqueBrands(goods);
});

export const searchOffers = createAsyncThunk(
  'parts/searchOffers',
  async ({ number, brand }: SearchOffersArg) => {
    const goods = await fetchHsPrice({
      number,
      brand,
      analogues: true,
    });

    return flattenOffers(goods);
  },
);

const partsSlice = createSlice({
  name: 'parts',
  initialState,
  reducers: {
    setArticle(state, action: PayloadAction<string>) {
      state.article = action.payload;
    },
    resetSearch() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchBrands.pending, (state, action) => {
      state.article = action.meta.arg;
      state.brandsStatus = 'loading';
      state.brandsError = '';
      state.brands = [];
      state.selectedBrand = '';
      state.offers = [];
      state.offersStatus = 'idle';
      state.offersError = '';
    });

    builder.addCase(searchBrands.fulfilled, (state, action) => {
      state.brandsStatus = 'succeeded';
      state.brands = action.payload;
    });

    builder.addCase(searchBrands.rejected, (state, action) => {
      state.brandsStatus = 'failed';
      state.brandsError = action.error.message || 'Не удалось получить список производителей';
    });

    builder.addCase(searchOffers.pending, (state, action) => {
      state.offersStatus = 'loading';
      state.offersError = '';
      state.offers = [];
      state.selectedBrand = action.meta.arg.brand;
    });

    builder.addCase(searchOffers.fulfilled, (state, action) => {
      state.offersStatus = 'succeeded';
      state.offers = action.payload;
    });

    builder.addCase(searchOffers.rejected, (state, action) => {
      state.offersStatus = 'failed';
      state.offersError = action.error.message || 'Не удалось получить аналоги и предложения';
    });
  },
});

export const { setArticle, resetSearch } = partsSlice.actions;
export const partsReducer = partsSlice.reducer;
