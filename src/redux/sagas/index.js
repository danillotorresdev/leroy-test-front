import { takeLatest, all } from 'redux-saga/effects';
import { Types } from '../actionCreators';
import { getBooks } from './books';
import { getUsers } from './users';
import { getProducts } from './products';

export default function* rootSaga() {
  yield all([
    takeLatest(Types.GET_BOOKS_REQUEST, getBooks),
    takeLatest(Types.GET_PRODUCTS_REQUEST, getProducts),
    takeLatest(Types.GET_USERS_REQUEST, getUsers),
  ]);
}
