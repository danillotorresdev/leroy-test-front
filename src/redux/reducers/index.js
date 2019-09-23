import { combineReducers } from 'redux';
import users from './users';
import books from './books';
import products from './products';

const rootReducer = combineReducers({
  users,
  books,
  products,
});

export default rootReducer;
