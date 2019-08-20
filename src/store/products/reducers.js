
const initialState = {
  products: [],
  product: null,
  isLoading: false,
  error: false
};

export default function productsReducer(state = initialState, action) {

  switch (action.type) {

    case "GET_PRODUCTS_REQUEST_SUCCEEDED": {
      // console.log(action)
      return {
        ...state,
        products: [...action.payload]
      };
    }

    case "GET_PRODUCT_REQUEST_SUCCEEDED": {
      // console.log(action)
      return {
        ...state,
        product: {
          ...state.product,
          product: action.payload
        } 
      };
    }



    default:
      return state;
  }
}