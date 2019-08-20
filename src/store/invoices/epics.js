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
  getInvoicesFail
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


export const epics = [
  getInvoicesRequest,
  getInvoicesRequestSuccess,
  getInvoicesRequestFail,

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