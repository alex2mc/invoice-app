import {
  GET_PRODUCT_SUCCEEDED,
  GET_PRODUCTS_SUCCEEDED,
} from './actions';


const initialState = {
  products: [],
  product: null,
};

export default function productsReducer(state = initialState, action) {

  switch (action.type) {

    case GET_PRODUCTS_SUCCEEDED: {
      return {
        ...state,
        products: action.payload
      };
    }

    case GET_PRODUCT_SUCCEEDED: {
      return {
        ...state,
        product: {
          ...state.product,
          product: action.payload.payload
        } 
      };
    }



    default:
      return state;
  }
}