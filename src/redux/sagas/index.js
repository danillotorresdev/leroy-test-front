import { takeLatest, all } from 'redux-saga/effects';
import { Types } from '../actionCreators';
import { getBooks } from './books';
import { getFreight } from './freight';
import { getProducts } from './products';

export default function* rootSaga() {
  yield all([
    takeLatest(Types.GET_PRODUCTS_REQUEST, getProducts),
    takeLatest(Types.GET_FREIGHT_REQUEST, getFreight),
  ]);
}
