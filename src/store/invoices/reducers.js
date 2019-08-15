import {
  FETCH_INVOICES,
  FETCH_INVOICES_SUCCESS,
  FETCH_INVOICES_FAILURE,
  POST_INVOICE,
  POST_INVOICE_SUCCESS,
  POST_INVOICE_FAILURE,
  GET_INVOICES_LIST,
  GET_INVOICES_LIST_SUCCESS,
  GET_INVOICES_LIST_FAILURE,
  DELETE_INVOICE,
  DELETE_INVOICE_SUCCESS,
  DELETE_INVOICE_FAILURE,
  EDIT_INVOICE,
  EDIT_INVOICE_SUCCESS,
  EDIT_INVOICE_FAILURE
} from './actions';

const initialState = {
  invoices: [],
  invoicesList: [],
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
        ...state,
        invoices: [...action.payload],
        isLoading: false,
        error: null
      };
    case FETCH_INVOICES_FAILURE:
      return {
        ...state,
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
        ...state,
        isLoading: false,
        error: null
      };
    case POST_INVOICE_FAILURE:
      return {
        error: action.payload
      };

    case GET_INVOICES_LIST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case GET_INVOICES_LIST_SUCCESS:
      return {
        ...state,
        invoicesList: [...action.payload],
        isLoading: false,
        error: null
      };
    case GET_INVOICES_LIST_FAILURE:
      return {
        ...state,
        invoicesList: [],
        isLoading: false,
        error: action.payload
      };

    case DELETE_INVOICE:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case DELETE_INVOICE_SUCCESS:
      return {
        ...state,
        // invoices: [...action.payload],
        isLoading: false,
        error: null
      };
    case DELETE_INVOICE_FAILURE:
      return {
        ...state,
        invoices: [],
        isLoading: false,
        error: action.payload
      };

    case EDIT_INVOICE:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case EDIT_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: [],
        invoicesList: [],
        isLoading: false,
        error: null
      };
    case EDIT_INVOICE_FAILURE:
      return {
        ...state,
        invoices: [],
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}