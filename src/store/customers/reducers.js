import {
  GET_CUSTOMERS_SUCCEEDED,
} from './actions';

const initialState = {
  customers: [],
  customer: null,
};

export default function customersReducer(state = initialState, action) {

  switch (action.type) {

    case GET_CUSTOMERS_SUCCEEDED: {
      return {
        ...state,
          customers: action.payload
      };
    }


    default:
      return state;
  }
}