export const FETCH_INVOICES = 'FETCH_INVOICES';
export const FETCH_INVOICES_SUCCESS = 'FETCH_INVOICES_SUCCESS';
export const FETCH_INVOICES_FAILURE = 'FETCH_INVOICES_FAILURE';
export const POST_INVOICE = 'POST_INVOICE';
export const POST_INVOICE_SUCCESS = 'POST_INVOICE_SUCCESS';
export const POST_INVOICE_FAILURE = 'POST_INVOICE_FAILURE';


export const fetchInvoices = () => ({
  type: FETCH_INVOICES,
});

export const fetchInvoicesSuccess = (invoices) => ({
  type: FETCH_INVOICES_SUCCESS,
  payload: invoices
});

export const fetchInvoicesFailure = (error) => ({
  type: FETCH_INVOICES_FAILURE,
  payload: error
});

export const postInvoice = (payload) => ({
  type: POST_INVOICE,
  payload: payload
});

export const postInvoiceSuccess = (invoices) => ({
  type: POST_INVOICE_SUCCESS,
  payload: invoices
});

export const postInvoiceFailure = (error) => ({
  type: POST_INVOICE_FAILURE,
  payload: error
});
