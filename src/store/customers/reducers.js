import {
  // GET_CUSTOMERS,
  // GET_CUSTOMERS_SUCCEEDED,
  // GET_CUSTOMERS_FAIL
} from './actions';

const initialState = {
  customers: [],
  isLoading: false,
  error: false
};

export default function customersReducer(state = initialState, action) {

  switch (action.type) {

    //how action become GET_CUSTOMERS_REQUEST_SUCCEEDED, not the GET_CUSTOMERS_SUCCEEDED
    case "GET_CUSTOMERS_REQUEST_SUCCEEDED": {
      // console.log(action)
      return {
        ...state,
        customers: [...action.payload]
      };
    }


    default:
      return state;
  }
}