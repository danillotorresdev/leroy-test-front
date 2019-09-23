import axios from 'axios';
import { put } from 'redux-saga/effects';
import ActionCreators from '../actionCreators';
import { baseUrl2 } from '../../service/API';

export function* getProducts() {
  const url = `${baseUrl2}/products`;
  const products = yield axios.get(url);
  console.log(products);
  yield put(ActionCreators.getProductsSuccess(products.data));
}
