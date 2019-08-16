import {
  GET_CUSTOMERS,
  GET_CUSTOMERS_SUCCEEDED,
  GET_CUSTOMERS_FAIL
} from './actions';

const initialState = {
  customers: [],
  isLoading: false,
  error: false
};

export default function customersReducer(state = initialState, action) {
  switch (action.type) {




    case GET_CUSTOMERS_SUCCEEDED: {
      // const { hasNext, hasPrevious, next, previous } = action.payload;

      return {
        ...state,
        // next,
        // previous,
        // hasNext,
        // hasPrevious,
      };
    }

    // case GET_CUSTOMERS:
    //   return {
    //     ...state,
    //     isLoading: true,
    //     error: null
    //   };
    // case GET_CUSTOMERS_SUCCEEDED:
    //   return {
    //     customers: [...action.payload],
    //     isLoading: false,
    //     error: null
    //   };
    // case GET_CUSTOMERS_FAIL:
    //   return {
    //     customers: [],
    //     isLoading: false,
    //     error: action.payload
    //   };

    default:
      return state;
  }
}