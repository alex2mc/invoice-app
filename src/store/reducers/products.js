import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE
} from '../actions/products';

const initialState = {
  products: [],
  isLoading: false,
  error: false
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {

    case FETCH_PRODUCTS:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        products: [...action.payload],
        isLoading: false,
        error: null
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        products: [],
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}