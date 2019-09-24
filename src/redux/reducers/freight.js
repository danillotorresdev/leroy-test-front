import { createReducer } from 'reduxsauce';
import { Types } from '../actionCreators';

export const INITIAL_STATE = {
  isLoading: false,
  data: '',
  freight: '',
};

export const getFreightRequest = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: true,
});

export const getFreightSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoading: false,
  data: action.freight,
});

export const getFreightFailure = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: false,
});
export const saveFreightSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoading: false,
  freight: action.freight,
});

export const HANDLERS = {
  [Types.GET_FREIGHT_REQUEST]: getFreightRequest,
  [Types.GET_FREIGHT_SUCCESS]: getFreightSuccess,
  [Types.GET_FREIGHT_FAILURE]: getFreightFailure,
  [Types.SAVE_FREIGHT_SUCCESS]: saveFreightSuccess,
};

export default createReducer(INITIAL_STATE, HANDLERS);
