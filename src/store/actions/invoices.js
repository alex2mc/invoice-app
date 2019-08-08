export const FETCH_INVOICES = 'FETCH_INVOICES';
export const FETCH_INVOICES_SUCCESS = 'FETCH_INVOICES_SUCCESS';
export const FETCH_INVOICES_FAILURE = 'FETCH_INVOICES_FAILURE';

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