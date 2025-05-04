import { all } from 'redux-saga/effects';
import productSaga from './product/productSaga';

export default function* rootSaga() {
  yield all([productSaga()]);
}
