import { ofType } from 'redux-observable';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import { map } from 'rxjs/operators';

import { transferActionEpicFactory } from '../utils/transfer-action';
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
  getInvoiceFail
  // POST_INVOICE_SUCCEEDED
} from "./actions";



export const getInvoicesRequest = (action$) =>
  action$.pipe(
    ofType(GET_INVOICES),
    map(() =>
      InvoicesRequestActions.getInvoices.action(),
    ),
  );

export const getInvoicesRequestSuccess = transferActionEpicFactory(
  InvoicesRequestsActionTypes.getInvoicesActionTypes.ACTION_SUCCEEDED,
  getInvoicesSucceeded,
  GET_INVOICES,
);

export const getInvoicesRequestFail = transferActionEpicFactory(
  InvoicesRequestsActionTypes.getInvoicesActionTypes.ACTION_FAILED,
  getInvoicesFail,
  GET_INVOICES,
);



export const postInvoiceRequest = (action$) =>
  action$.pipe(
    ofType(POST_INVOICE),
    map(
      (invoice) => {
        // console.log(invoice)
        return InvoicesRequestActions.postInvoice.action(invoice);
      },
    ),
  );

export const postInvoiceRequestSuccess = transferActionEpicFactory(
  InvoicesRequestsActionTypes.postInvoiceActionTypes.ACTION_SUCCEEDED,
  postInvoiceSucceeded,
  POST_INVOICE,
);

export const postInvoiceRequestFail = transferActionEpicFactory(
  InvoicesRequestsActionTypes.postInvoiceActionTypes.ACTION_FAILED,
  postInvoiceFail,
  POST_INVOICE,
);

export const continueOnPostInvoiceSuccess = (action$) =>
  action$.pipe(
    ofType("POST_INVOICE_REQUEST_SUCCEEDED"),
    map(
      (response) => {
        // console.log(JSON.parse(response.payload.request.body));
        const product_id = JSON.parse(response.payload.request.body).product_id;
        const quantity = JSON.parse(response.payload.request.body).quantity;
        const invoice_id = response.payload.response._id;

        const payload = {invoice_id, product_id, quantity}
        console.log(product_id)
        console.log(quantity)
        // debugger
      return InvoicesRequestActions.postInvoiceItems.action(payload)
      },
      ),
  );


export const deleteInvoiceRequest = (action$) =>
  action$.pipe(
    ofType(DELETE_INVOICE),
    map(
      (id) => {
        // console.log(id)
        return InvoicesRequestActions.deleteInvoice.action(id.id);
      },
    ),
  );

export const deleteInvoiceRequestSuccess = transferActionEpicFactory(
  InvoicesRequestsActionTypes.deleteInvoiceActionTypes.ACTION_SUCCEEDED,
  deleteInvoiceSucceeded,
  DELETE_INVOICE,
);

export const deleteInvoiceRequestFail = transferActionEpicFactory(
  InvoicesRequestsActionTypes.deleteInvoiceActionTypes.ACTION_FAILED,
  deleteInvoiceFail,
  DELETE_INVOICE,
);


export const getInvoiceItemsRequest = (action$) =>
  action$.pipe(
    ofType(GET_INVOICE_ITEMS),
    map((id) => {
      // debugger
      return InvoicesRequestActions.getInvoiceItems.action(id.id)},
    ),
  );

export const getInvoiceItemsRequestSuccess = transferActionEpicFactory(
  InvoicesRequestsActionTypes.getInvoiceItemsActionTypes.ACTION_SUCCEEDED,
  getInvoiceItemsSucceeded,
  GET_INVOICE_ITEMS,
);

export const getInvoiceItemsRequestFail = transferActionEpicFactory(
  InvoicesRequestsActionTypes.getInvoiceItemsActionTypes.ACTION_FAILED,
  getInvoiceItemsFail,
  GET_INVOICE_ITEMS,
);

export const getInvoiceRequest = (action$) =>
  action$.pipe(
    ofType(GET_INVOICE),
    map((id) => {
      // debugger
      return InvoicesRequestActions.getInvoice.action(id.id)},
    ),
  );

export const getInvoiceRequestSuccess = transferActionEpicFactory(
  InvoicesRequestsActionTypes.getInvoiceActionTypes.ACTION_SUCCEEDED,
  getInvoiceSucceeded,
  GET_INVOICE);

export const getInvoiceRequestFail = transferActionEpicFactory(
  InvoicesRequestsActionTypes.getInvoiceActionTypes.ACTION_FAILED,
  getInvoiceFail,
  GET_INVOICE,
);


export const epics = [
  getInvoicesRequest,
  getInvoicesRequestSuccess,
  getInvoicesRequestFail,
  postInvoiceRequest,
  postInvoiceRequestSuccess,
  postInvoiceRequestFail,
  continueOnPostInvoiceSuccess,
  deleteInvoiceRequest,
  deleteInvoiceRequestSuccess,
  deleteInvoiceRequestFail,
  getInvoiceItemsRequest,
  getInvoiceItemsRequestSuccess,
  getInvoiceItemsRequestFail,
  getInvoiceRequest,
  getInvoiceRequestSuccess,
  getInvoiceRequestFail
];




// export function fetchInvoicesEpic(action$) {
//   return action$
//     .ofType(FETCH_INVOICES)
//     .switchMap(() => {
//
//       return ajax
//         .getJSON(url)
//         .map(invoices => invoices.map(invoice => ({
//           id: invoice._id,
//           customer: invoice.customer_id,
//           discount: invoice.discount,
//           total: invoice.total,
//         })))
//     })
//     .map(invoices => fetchInvoicesSuccess(invoices))
//
//     .catch(error => Observable.of(fetchInvoicesFailure(error.message)))
// }
//
//
// export function postInvoiceEpic(action$) {
//   return action$
//     .ofType(POST_INVOICE)
//     .mergeMap(action => {
//       return ajax
//         .post(
//           url,
//           JSON.stringify(action.payload),
//           {'Content-Type': 'application/json'}
//         )
//         .map(response => postInvoiceSuccess(response))
//         .catch(error => Observable.of(postInvoiceFailure(error)))
//     })
// }
//
// export function getInvoicesListEpic(action$) {
//   return action$
//     .ofType(GET_INVOICES_LIST)
//     .switchMap((id) => {
//       // console.log(id.id)
//       return ajax
//
//         .getJSON(`https://api.invoice-app.2muchcoffee.com/api/invoices/${id.id}/items`)
//         .map(invoicesList => invoicesList.map(invoiceList => ({
//           id: invoiceList._id,
//           invoice_id: invoiceList.invoice_id,
//           product_id: invoiceList.product_id,
//           quantity: invoiceList.quantity,
//         })))
//     })
//     .map(invoices => getInvoicesListSuccess(invoices))
//
//     .catch(error => Observable.of(getInvoicesListFailure(error.message)))
// }
//
// export function deleteInvoiceEpic(action$) {
//   return action$
//     .ofType(DELETE_INVOICE)
//     .switchMap((id) => {
//       // console.log(id)
//       return ajax
//
//         .delete(`https://api.invoice-app.2muchcoffee.com/api/invoices/${id.id}`)
//     })
//     .map(invoices => deleteInvoiceSuccess(invoices))
//
//     .catch(error => Observable.of(deleteInvoiceFailure(error.message)))
// }
//
// export function editInvoiceEpic(action$) {
//   return action$
//     .ofType(EDIT_INVOICE)
//     .mergeMap((id, action) => {
//       console.log(id)
//       return ajax
//         .put(
//           `https://api.invoice-app.2muchcoffee.com/api/invoices/${id.id}`,
//           JSON.stringify(action.payload),
//           {'Content-Type': 'application/json'})
//     })
//     .map(invoices => editInvoiceSuccess(invoices))
//
//     .catch(error => Observable.of(editInvoiceFailure(error.message)))
// }