import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    items: [],
    selectedProduct: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchProducts: (state) => {
      state.loading = true;
    },
    fetchProductsSuccess: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchProductById: (state) => {
      state.loading = true;
    },
    fetchProductByIdSuccess: (state, action) => {
      state.selectedProduct = action.payload;
      state.loading = false;
    },
    fetchProductByIdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProducts,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductById,
  fetchProductByIdSuccess,
  fetchProductByIdFailure,
} = productSlice.actions;

export default productSlice.reducer;
