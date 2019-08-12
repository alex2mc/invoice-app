import {
  FETCH_INVOICES,
  FETCH_INVOICES_SUCCESS,
  FETCH_INVOICES_FAILURE,
  POST_INVOICE,
  POST_INVOICE_SUCCESS,
  POST_INVOICE_FAILURE
} from '../actions/invoices';

const initialState = {
  invoices: [],
  isLoading: false,
  error: false
};

export default function invoicesReducer(state = initialState, action) {
  switch (action.type) {

    case FETCH_INVOICES:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case FETCH_INVOICES_SUCCESS:
      return {
        invoices: [...action.payload],
        isLoading: false,
        error: null
      };
    case FETCH_INVOICES_FAILURE:
      return {
        invoices: [],
        isLoading: false,
        error: action.payload
      };

    case POST_INVOICE:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case POST_INVOICE_SUCCESS:
      return {
        isLoading: false,
        error: null
      };
    case POST_INVOICE_FAILURE:
      return {
        error: action.payload
      };

    default:
      return state;
  }
}