import axios from 'axios';
import { put, select } from 'redux-saga/effects';
import ActionCreators from '../actionCreators';
import { freightApi } from '../../service/API';

export function* getFreight() {
  const state = yield select();
  const frete = state.freight.freight;
  const url = `${freightApi}/${frete}`;
  const freight = yield axios.get(url);
  yield put(ActionCreators.getFreightSuccess(freight.data));
}
