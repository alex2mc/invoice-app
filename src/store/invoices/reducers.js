import {
  GET_INVOICES_SUCCEEDED,
  GET_INVOICE_SUCCEEDED,
  GET_INVOICE_ITEMS_SUCCEEDED,
  UPDATE_INVOICE_SUCCEEDED
} from './actions';

const initialState = {
  invoices: [],
  invoiceItems: [],
  invoice: null,
};

export default function invoicesReducer(state = initialState, action) {
  switch (action.type) {

    case GET_INVOICES_SUCCEEDED: {
      return {
        ...state,
        invoices: action.payload
      };
    }

    case GET_INVOICE_ITEMS_SUCCEEDED: {
      return {
        ...state,
        invoiceItems: action.payload
      };
    }

    case GET_INVOICE_SUCCEEDED:
    case UPDATE_INVOICE_SUCCEEDED: {
      return {
        ...state,
        invoice: {
          ...state.invoice,
          invoice: action.payload
        }
      };
    }

    default:
      return state;
  }
}