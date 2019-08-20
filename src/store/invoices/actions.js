export const GET_INVOICES = 'GET_INVOICES';
export const GET_INVOICES_SUCCEEDED = 'GET_INVOICES_SUCCEEDED';
export const GET_INVOICES_FAIL = 'GET_INVOICES_FAIL';


export const POST_INVOICE = 'POST_INVOICE';
export const POST_INVOICE_SUCCEEDED = 'POST_INVOICE_SUCCEEDED';
export const POST_INVOICE_FAIL = 'POST_INVOICE_FAIL';

export const POST_INVOICE_ITEMS = 'POST_INVOICE_ITEMS';
export const POST_INVOICE_ITEMS_SUCCEEDED = 'POST_INVOICE_ITEMS_SUCCEEDED';
export const POST_INVOICE_ITEMS_FAIL = 'POST_INVOICE_ITEMS_FAIL';


export const DELETE_INVOICE = 'DELETE_INVOICE';
export const DELETE_INVOICE_SUCCEEDED = 'DELETE_INVOICE_SUCCEEDED';
export const DELETE_INVOICE_FAIL = 'DELETE_INVOICE_FAIL';


export const GET_INVOICE = 'GET_INVOICE';
export const GET_INVOICE_SUCCEEDED = 'GET_INVOICE_SUCCEEDED';
export const GET_INVOICE_FAIL = 'GET_INVOICE_FAIL';

export const GET_INVOICE_ITEMS = 'GET_INVOICE_ITEMS';
export const GET_INVOICE_ITEMS_SUCCEEDED = 'GET_INVOICE_ITEMS_SUCCEEDED';
export const GET_INVOICE_ITEMS_FAIL = 'GET_INVOICE_ITEMS_FAIL';

// export const GET_INVOICES_LIST = 'GET_INVOICES_LIST';
// export const GET_INVOICES_LIST_SUCCESS = 'GET_INVOICES_LIST_SUCCESS';
// export const GET_INVOICES_LIST_FAILURE = 'GET_INVOICES_LIST_FAILURE';

// export const EDIT_INVOICE = 'EDIT_INVOICE';
// export const EDIT_INVOICE_SUCCESS = 'EDIT_INVOICE_SUCCESS';
// export const EDIT_INVOICE_FAILURE = 'EDIT_INVOICE_FAILURE';



export const getInvoices = () => ({
  type: GET_INVOICES,
});

export const getInvoicesSucceeded = (invoices) => ({
  type: GET_INVOICES_SUCCEEDED,
  payload: invoices
});

export const getInvoicesFail = (error) => ({
  type: GET_INVOICES_FAIL,
  payload: error
});




export const postInvoice = (payload) => ({
  type: POST_INVOICE,
  payload: payload
});

export const postInvoiceSucceeded = (invoices) => ({
  type: POST_INVOICE_SUCCEEDED,
  payload: invoices
});

export const postInvoiceFail = (error) => ({
  type: POST_INVOICE_FAIL,
  payload: error
});


export const postInvoiceItems = (payload) => ({
  type: POST_INVOICE_ITEMS,
  payload: payload
});

export const postInvoiceItemsSucceeded = (invoices) => ({
  type: POST_INVOICE_ITEMS_SUCCEEDED,
  payload: invoices
});

export const postInvoiceItemsFail = (error) => ({
  type: POST_INVOICE_ITEMS_FAIL,
  payload: error
});



export const deleteInvoice = (id) => ({
  type: DELETE_INVOICE,
  id: id
});

export const deleteInvoiceSucceeded = (invoices) => ({
  type: DELETE_INVOICE_SUCCEEDED,
  payload: invoices
});

export const deleteInvoiceFail = (error) => ({
  type: DELETE_INVOICE_FAIL,
  payload: error
});



export const getInvoiceItems = (id) => ({
  type: GET_INVOICE_ITEMS,
  id: id
});

export const getInvoiceItemsSucceeded = (invoiceList) => ({
  type: GET_INVOICE_ITEMS_SUCCEEDED,
  payload: invoiceList
});

export const getInvoiceItemsFail = (error) => ({
  type: GET_INVOICE_ITEMS_FAIL,
  payload: error
});


export const getInvoice = (id) => ({
  type: GET_INVOICE,
  id: id
});

export const getInvoiceSucceeded = (invoiceList) => ({
  type: GET_INVOICE_SUCCEEDED,
  payload: invoiceList
});

export const getInvoiceFail = (error) => ({
  type: GET_INVOICE_FAIL,
  payload: error
});




// export const getInvoicesList = (id) => ({
//   type: GET_INVOICES_LIST,
//   id: id
// });
//
// export const getInvoicesListSuccess = (invoices) => ({
//   type: GET_INVOICES_LIST_SUCCESS,
//   payload: invoices
// });
//
// export const getInvoicesListFailure = (error) => ({
//   type: GET_INVOICES_LIST_FAILURE,
//   payload: error
// });
//

//
// export const editInvoice = (id, payload) => ({
//   type: EDIT_INVOICE,
//   id: id,
//   payload: payload
// });
//
// export const editInvoiceSuccess = (invoices) => ({
//   type: EDIT_INVOICE_SUCCESS,
//   payload: invoices
// });
//
// export const editInvoiceFailure = (error) => ({
//   type: EDIT_INVOICE_FAILURE,
//   payload: error
// });