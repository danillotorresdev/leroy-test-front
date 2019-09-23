import { createReducer } from 'reduxsauce';
import { Types } from '../actionCreators';

export const INITIAL_STATE = {
  isLoading: false,
  data: [],
  productsInCart: [],
};

export const getProductsRequest = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: true,
});

export const getProductsSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoading: false,
  data: action.products,
});

export const getProductsFailure = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: false,
});


export const saveProductsInCartSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  productsInCart: action.productsInCart.productsInCart,
});

export const HANDLERS = {
  [Types.GET_PRODUCTS_REQUEST]: getProductsRequest,
  [Types.GET_PRODUCTS_SUCCESS]: getProductsSuccess,
  [Types.GET_PRODUCTS_FAILURE]: getProductsFailure,
  [Types.SAVE_PRODUCTS_IN_CART_SUCCESS]: saveProductsInCartSuccess,
};

export default createReducer(INITIAL_STATE, HANDLERS);
