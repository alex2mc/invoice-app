import { Observable } from 'rxjs';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import { ajax } from 'rxjs/observable/dom/ajax';

import {
  FETCH_INVOICES,
  fetchInvoicesSuccess,
  fetchInvoicesFailure
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