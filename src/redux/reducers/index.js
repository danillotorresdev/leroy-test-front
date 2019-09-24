import { combineReducers } from 'redux';
import products from './products';
import freight from './freight';

const rootReducer = combineReducers({
  freight,
  products,
});

export default rootReducer;
