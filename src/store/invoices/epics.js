import { ofType } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs'

import { Actions as InvoicesRequestActions, ActionTypes as InvoicesRequestsActionTypes } from '../invoices-requests';

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
  POST_INVOICE_SUCCEEDED,
  POST_INVOICE_ITEMS_SUCCEEDED,
  postInvoiceItemsSucceeded,
  postInvoiceItemsFail,
  UPDATE_INVOICE_SUCCEEDED,
  updateInvoiceItemsSucceeded,
  updateInvoiceItemsFail,
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
    map((action) => getInvoicesFail(action.payload)),
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
    map((action) => postInvoiceFail(action)),
);



export const postInvoiceItemsRequest = (action$) =>
  action$.pipe(
    ofType(POST_INVOICE_SUCCEEDED),
    mergeMap(
      (action) => {
        const { payload, meta } = action.payload;

        const invoice_id = payload.response._id;
        const items = meta;

        return from(items)
          .pipe(
            map(  item => {
              return InvoicesRequestActions.postInvoiceItems.action({...item, invoice_id})
            })
          );
      }
    )
  );


export const postInvoiceItemsRequestSuccess = (action$) =>
  action$.pipe(
    ofType(InvoicesRequestsActionTypes.postInvoiceItemsActionTypes.ACTION_SUCCEEDED),
    map((action) => postInvoiceItemsSucceeded(action.payload)),
  );

export const postInvoiceItemsRequestFail = (action$) =>
  action$.pipe(
    ofType(InvoicesRequestsActionTypes.postInvoiceItemsActionTypes.ACTION_FAILED),
    map((action) => postInvoiceItemsFail(action.payload)),
  );



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
    map((action) => deleteInvoiceSucceeded(action.payload)),
);

export const deleteInvoiceRequestFail = (action$) =>
  action$.pipe(
    ofType(  InvoicesRequestsActionTypes.deleteInvoiceActionTypes.ACTION_FAILED),
    map((action) => deleteInvoiceFail(action.payload)),
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
    map((action) => getInvoiceItemsFail(action.payload)),
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
    map((action) => getInvoiceFail(action.payload))
);


export const updateInvoiceRequest = (action$) =>
  action$.pipe(
    ofType(UPDATE_INVOICE),
    map(
      (action) => {
        return InvoicesRequestActions.updateInvoice.action(action.payload, action.payload.items)
      },
    ),
  );

export const updateInvoiceRequestSuccess = (action$) =>
  action$.pipe(
    ofType(InvoicesRequestsActionTypes.updateInvoiceActionTypes.ACTION_SUCCEEDED),
    map((action) => updateInvoiceSucceeded(action)),
  );

export const updateInvoiceRequestFail = (action$) =>
  action$.pipe(
    ofType(InvoicesRequestsActionTypes.updateInvoiceActionTypes.ACTION_FAILED),
    map((action) => updateInvoiceFail(action)),
  );



export const updateInvoiceItemsRequest = (action$) =>
  action$.pipe(
    ofType(UPDATE_INVOICE_SUCCEEDED),
    mergeMap(
      (action) => {

        const { payload, meta } = action.payload;

        const invoice_id = payload.response._id;
        const items = meta;

        return from(items)
          .pipe(
            map(  item => {
              return InvoicesRequestActions.updateInvoiceItems.action({...item, invoice_id})
            })
          );
      }
    )
  );


export const updateInvoiceItemsRequestSuccess = (action$) =>
  action$.pipe(
    ofType(InvoicesRequestsActionTypes.updateInvoiceItemsActionTypes.ACTION_SUCCEEDED),
    map((action) => updateInvoiceItemsSucceeded(action.payload)),
  );

export const updateInvoiceItemsRequestFail = (action$) =>
  action$.pipe(
    ofType(InvoicesRequestsActionTypes.updateInvoiceItemsActionTypes.ACTION_FAILED),
    map((action) => updateInvoiceItemsFail(action.payload)),
  );



export const epics = [
  getInvoicesRequest,
  getInvoicesRequestSuccess,
  getInvoicesRequestFail,

  postInvoiceRequest,
  postInvoiceRequestSuccess,
  postInvoiceRequestFail,

  postInvoiceItemsRequest,
  postInvoiceItemsRequestSuccess,
  postInvoiceItemsRequestFail,

  deleteInvoiceRequest,
  deleteInvoiceRequestSuccess,
  deleteInvoiceRequestFail,

  continueOnDeleteInvoiceSuccess,

  getInvoiceItemsRequest,
  getInvoiceItemsRequestSuccess,
  getInvoiceItemsRequestFail,

  getInvoiceRequest,
  getInvoiceRequestSuccess,
  getInvoiceRequestFail,

  continueOnPostInvoiceItemsSuccess,

  updateInvoiceRequest,
  updateInvoiceRequestSuccess,
  updateInvoiceRequestFail,

  updateInvoiceItemsRequest,
  updateInvoiceItemsRequestSuccess,
  updateInvoiceItemsRequestFail
];
