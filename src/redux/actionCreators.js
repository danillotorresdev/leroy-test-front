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

});

export default Creators;
