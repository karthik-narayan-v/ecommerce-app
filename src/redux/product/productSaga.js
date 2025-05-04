import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchProducts,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductById,
  fetchProductByIdSuccess,
  fetchProductByIdFailure,
} from './productSlice';

import { fetchAllProducts, fetchProductById as getProduct } from '../../api/productApi';

function* handleFetchProducts() {
  try {
    const response = yield call(fetchAllProducts);
    yield put(fetchProductsSuccess(response.data));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

function* handleFetchProductById(action) {
  try {
    const response = yield call(getProduct, action.payload);
    yield put(fetchProductByIdSuccess(response.data));
  } catch (error) {
    yield put(fetchProductByIdFailure(error.message));
  }
}

export default function* productSaga() {
  yield takeLatest(fetchProducts.type, handleFetchProducts);
  yield takeLatest(fetchProductById.type, handleFetchProductById);
}
