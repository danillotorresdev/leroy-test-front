import { createActions } from 'reduxsauce';

export const {
  Types,
  Creators,
} = createActions({
  getBooksRequest: null,
  getBooksSuccess: ['books'],
  getBooksFailure: null,

  saveBooksInCartSuccess: ['booksInCart'],

  getUsersRequest: null,
  getUsersSuccess: ['users'],
  getUsersFailure: null,

  getProductsRequest: null,
  getProductsSuccess: ['products'],
  getProductsFailure: null,

  saveProductsInCartSuccess: ['productsInCart'],

  getFreightRequest: null,
  getFreightSuccess: ['freight'],
  getFreightFailure: null,

  saveFreightSuccess: ['freight'],

});

export default Creators;
