import { ofType } from 'redux-observable';
import { map } from 'rxjs/operators';


import { transferActionEpicFactory } from '../utils/transfer-action';
import { Actions as InvoicesRequestActions, ActionTypes as InvoicesRequestsActionTypes } from '../invoices-requests';
import { Actions as CustomersRequestActions } from '../customers-requests/index';
import { Actions as ProductsRequestActions } from '../products-requests/index';


import {
  GET_INVOICES,
  getInvoicesSucceeded,
  getInvoicesFail,


  POST_INVOICE,
  postInvoiceSucceeded,
  postInvoiceFail,
  DELETE_INVOICE,
  deleteInvoiceSucceeded,
  deleteInvoiceFail,
  GET_INVOICE_ITEMS,
  getInvoiceItemsSucceeded,
  getInvoiceItemsFail,
  GET_INVOICE,
  getInvoiceSucceeded,
  getInvoiceFail,
  UPDATE_INVOICE,
  updateInvoiceSucceeded,
  updateInvoiceFail,
  DELETE_INVOICE_SUCCEEDED,
  GET_INVOICE_SUCCEEDED,
  POST_INVOICE_SUCCEEDED,
  POST_INVOICE_ITEMS_SUCCEEDED,
  GET_INVOICE_ITEMS_SUCCEEDED
  // POST_INVOICE_SUCCEEDED
} from "./actions";




export const getInvoicesRequest = (action$) =>
  action$.pipe(
    ofType(GET_INVOICES),
    map(() =>
      InvoicesRequestActions.getInvoices.action(),
    ),
  );

export const getInvoicesRequestSuccess = (action$) =>
  action$.pipe(
    ofType(InvoicesRequestsActionTypes.getInvoicesActionTypes.ACTION_SUCCEEDED),
    map((action) => getInvoicesSucceeded(action.payload)),
);

export const getInvoicesRequestFail = (action$) =>
  action$.pipe(
    ofType(InvoicesRequestsActionTypes.getInvoicesActionTypes.ACTION_FAILED),
    map(({ payload, meta }) => getInvoicesFail({ payload, meta })),
);










export const postInvoiceRequest = (action$) =>
  action$.pipe(
    ofType(POST_INVOICE),
    map(
      (action) => {
        return InvoicesRequestActions.postInvoice.action(action.payload, action.payload.items);
      },
    ),
  );

export const postInvoiceRequestSuccess = (action$) =>
  action$.pipe(
    ofType(InvoicesRequestsActionTypes.postInvoiceActionTypes.ACTION_SUCCEEDED),
    map((action) => postInvoiceSucceeded(action)),
);

export const postInvoiceRequestFail = (action$) =>
action$.pipe(
  ofType(InvoicesRequestsActionTypes.postInvoiceActionTypes.ACTION_FAILED),
  map(({ payload, meta }) => postInvoiceFail({ payload, meta })),
);



export const postInvoiceItemsRequest = (action$) =>
  action$.pipe(
    ofType(POST_INVOICE_SUCCEEDED),
    map(
      (action) => {
        // console.log(action);

        const invoice_id = action.payload.response._id;
        const items = action.meta
        console.log(items);

        const payload = { invoice_id, items }

        return InvoicesRequestActions.postInvoiceItems.action(payload)

        })
      )


export const continueOnPostInvoiceItemsSuccess = (action$) =>
  action$.pipe(
    ofType(POST_INVOICE_ITEMS_SUCCEEDED),
    map(
      () => {
        return InvoicesRequestActions.getInvoices.action();
      }
    )
  );


export const deleteInvoiceRequest = (action$) =>
  action$.pipe(
    ofType(DELETE_INVOICE),
    map(
      (id) => {
        return InvoicesRequestActions.deleteInvoice.action(id.id);
      },
    ),
  );

export const deleteInvoiceRequestSuccess = (action$) =>
  action$.pipe(
    ofType(InvoicesRequestsActionTypes.deleteInvoiceActionTypes.ACTION_SUCCEEDED),
    map((action) => deleteInvoiceSucceeded(action)),
);

export const deleteInvoiceRequestFail = (action$) =>
  action$.pipe(
    ofType(  InvoicesRequestsActionTypes.deleteInvoiceActionTypes.ACTION_FAILED),
    map(({ payload, meta }) => deleteInvoiceFail({ payload, meta })),
);

export const continueOnDeleteInvoiceSuccess = (action$) =>
  action$.pipe(
    ofType(DELETE_INVOICE_SUCCEEDED),
    map(
      () => {
        return InvoicesRequestActions.getInvoices.action();
      }
    )
  );


export const getInvoiceItemsRequest = (action$) =>
  action$.pipe(
    ofType(GET_INVOICE_ITEMS),
    map((id) => {
      // debugger
      return InvoicesRequestActions.getInvoiceItems.action(id.id)},
    ),
  );

export const getInvoiceItemsRequestSuccess = (action$) =>
  action$.pipe(
    ofType(InvoicesRequestsActionTypes.getInvoiceItemsActionTypes.ACTION_SUCCEEDED),
    map((action) => getInvoiceItemsSucceeded(action.payload))
);

export const getInvoiceItemsRequestFail = (action$) =>
  action$.pipe(
    ofType(InvoicesRequestsActionTypes.getInvoiceItemsActionTypes.ACTION_FAILED),
    map(({ payload, meta }) => getInvoiceItemsFail({ payload, meta })),
);



export const getInvoiceRequest = (action$) =>
  action$.pipe(
    ofType(GET_INVOICE),
    map((id) => {
      return InvoicesRequestActions.getInvoice.action(id.id)},
    ),
  );

export const getInvoiceRequestSuccess = (action$) =>
  action$.pipe(
    ofType(InvoicesRequestsActionTypes.getInvoiceActionTypes.ACTION_SUCCEEDED),
    map((action) => getInvoiceSucceeded(action.payload)),
  );

export const getInvoiceRequestFail = (action$) =>
  action$.pipe(
    ofType(InvoicesRequestsActionTypes.getInvoiceActionTypes.ACTION_FAILED),
    map(({ payload, meta }) => getInvoiceFail({ payload, meta }))
);


export const continueOnGetInvoiceSuccess = (action$) =>
  action$.pipe(
    ofType(GET_INVOICE_SUCCEEDED),
    map(
      (response) => {
      const id = response.payload.customer_id;
      return CustomersRequestActions.getCustomer.action(id)
      },
    ),
  );





export const continueOnGetInvoiceItemsSuccess = (action$) =>
  action$.pipe(
    ofType(GET_INVOICE_ITEMS_SUCCEEDED),
    map(
      (response) => {       
        // console.log(response.payload);
      return ProductsRequestActions.getProduct.action()
      },
      ),
  );

export const updateInvoiceRequest = (action$) =>
  action$.pipe(
    ofType(UPDATE_INVOICE),
    map(
      (payload) => {
        // console.log(payload.payload.invoice_id);

        return InvoicesRequestActions.updateInvoice.action(payload.payload)
      },
    ),
  );

export const updateInvoiceRequestSuccess = transferActionEpicFactory(
  InvoicesRequestsActionTypes.updateInvoiceActionTypes.ACTION_SUCCEEDED,
  updateInvoiceSucceeded,
  UPDATE_INVOICE,
);

export const updateInvoiceRequestFail = transferActionEpicFactory(
  InvoicesRequestsActionTypes.updateInvoiceActionTypes.ACTION_FAILED,
  updateInvoiceFail,
  UPDATE_INVOICE,
);


export const epics = [
  getInvoicesRequest,
  getInvoicesRequestSuccess,
  getInvoicesRequestFail,

  postInvoiceRequest,
  postInvoiceRequestSuccess,
  postInvoiceRequestFail,
  // postInvoiceItemsRequest,
  deleteInvoiceRequest,
  deleteInvoiceRequestSuccess,
  deleteInvoiceRequestFail,
  getInvoiceItemsRequest,
  getInvoiceItemsRequestSuccess,
  getInvoiceItemsRequestFail,
  getInvoiceRequest,
  getInvoiceRequestSuccess,
  getInvoiceRequestFail,
  continueOnGetInvoiceSuccess,
  // continueOnPostInvoiceItemsSuccess,
  continueOnDeleteInvoiceSuccess,
  // updateInvoiceRequest,
  // updateInvoiceRequestSuccess,
  // updateInvoiceRequestFail
  // continueOnGetInvoiceItemsSuccess
];
