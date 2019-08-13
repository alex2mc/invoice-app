import { Observable } from 'rxjs';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import { ajax } from 'rxjs/observable/dom/ajax';

import {
  FETCH_INVOICES,
  fetchInvoicesSuccess,
  fetchInvoicesFailure,
  POST_INVOICE,
  postInvoiceSuccess,
  postInvoiceFailure,
  GET_INVOICES_LIST,
  getInvoicesListSuccess,
  getInvoicesListFailure
} from "../actions/invoices";


const url = 'https://api.invoice-app.2muchcoffee.com/api/invoices';

export function fetchInvoicesEpic(action$) {
  return action$
    .ofType(FETCH_INVOICES)
    .switchMap(() => {

      return ajax
        .getJSON(url)
        .map(invoices => invoices.map(invoice => ({
          id: invoice._id,
          customer: invoice.customer_id,
          discount: invoice.discount,
          total: invoice.total,
        })))
    })
    .map(invoices => fetchInvoicesSuccess(invoices))

    .catch(error => Observable.of(fetchInvoicesFailure(error.message)))
}


export function postInvoiceEpic(action$) {
    return action$
      .ofType(POST_INVOICE)
      .mergeMap(action => {
        return ajax
          .post(
          url,
            JSON.stringify(action.payload),
          {'Content-Type': 'application/json'}
        )
          .map(response => postInvoiceSuccess(response))
          .catch(error => Observable.of(postInvoiceFailure(error)))
      })
}

export function getInvoicesListEpic(action$) {
  return action$
    .ofType(GET_INVOICES_LIST)
    .switchMap((id) => {
      // console.log(id.id)
      return ajax

        .getJSON(`https://api.invoice-app.2muchcoffee.com/api/invoices/${id.id}/items`)
        .map(invoices => invoices.map(invoice => ({
          id: invoice._id,
          invoice_id: invoice.invoice_id,
          product_id: invoice.product_id,
          quantity: invoice.product_id,
        })))
    })
    .map(invoices => getInvoicesListSuccess(invoices))

    .catch(error => Observable.of(getInvoicesListFailure(error.message)))
}