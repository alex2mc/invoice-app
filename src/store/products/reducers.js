
const initialState = {
  products: [],
  isLoading: false,
  error: false
};

export default function customersReducer(state = initialState, action) {

  switch (action.type) {

    case "GET_PRODUCTS_REQUEST_SUCCEEDED": {
      // console.log(action)
      return {
        ...state,
        products: [...action.payload]
      };
    }


    default:
      return state;
  }
}