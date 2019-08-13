export const FETCH_INVOICES = 'FETCH_INVOICES';
export const FETCH_INVOICES_SUCCESS = 'FETCH_INVOICES_SUCCESS';
export const FETCH_INVOICES_FAILURE = 'FETCH_INVOICES_FAILURE';
export const POST_INVOICE = 'POST_INVOICE';
export const POST_INVOICE_SUCCESS = 'POST_INVOICE_SUCCESS';
export const POST_INVOICE_FAILURE = 'POST_INVOICE_FAILURE';
export const GET_INVOICES_LIST = 'GET_INVOICES_LIST';
export const GET_INVOICES_LIST_SUCCESS = 'GET_INVOICES_LIST_SUCCESS';
export const GET_INVOICES_LIST_FAILURE = 'GET_INVOICES_LIST_FAILURE';
export const DELETE_INVOICE = 'DELETE_INVOICE';
export const DELETE_INVOICE_SUCCESS = 'DELETE_INVOICE_SUCCESS';
export const DELETE_INVOICE_FAILURE = 'DELETE_INVOICE_FAILURE';


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

export const getInvoicesList = (id) => ({
  type: GET_INVOICES_LIST,
  id: id
});

export const getInvoicesListSuccess = (invoices) => ({
  type: GET_INVOICES_LIST_SUCCESS,
  payload: invoices
});

export const getInvoicesListFailure = (error) => ({
  type: GET_INVOICES_LIST_FAILURE,
  payload: error
});


export const deleteInvoice = (id) => ({
  type: DELETE_INVOICE,
  id: id
});

export const deleteInvoiceSuccess = (invoices) => ({
  type: DELETE_INVOICE_SUCCESS,
  payload: invoices
});

export const deleteInvoiceFailure = (error) => ({
  type: DELETE_INVOICE_FAILURE,
  payload: error
});