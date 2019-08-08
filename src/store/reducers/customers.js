import {
  FETCH_CUSTOMERS,
  FETCH_CUSTOMERS_SUCCESS,
  FETCH_CUSTOMERS_FAILURE
} from '../actions/customers';

const initialState = {
  customers: [],
  isLoading: false,
  error: false
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {

    case FETCH_CUSTOMERS:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case FETCH_CUSTOMERS_SUCCESS:
      return {
        customers: [...action.payload],
        isLoading: false,
        error: null
      };
    case FETCH_CUSTOMERS_FAILURE:
      return {
        customers: [],
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}