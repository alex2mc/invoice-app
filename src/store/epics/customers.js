import { Observable } from 'rxjs';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import { ajax } from 'rxjs/observable/dom/ajax';

import {
  FETCH_CUSTOMERS,
  fetchCustomersSuccess,
  fetchCustomersFailure
} from "../actions/customers";


const url = 'https://api.invoice-app.2muchcoffee.com/api/customers';

export function fetchCustomersEpic(action$) {

  return action$
    .ofType(FETCH_CUSTOMERS)
    .switchMap(() => {

      return ajax
        .getJSON(url)
        .map(customers => customers.map(customer => ({
          id: customer._id,
          name: customer.name,
          address: customer.address,
          phone: customer.phone,
        })))
    })
    .map(customers => fetchCustomersSuccess(customers))

    .catch(error => Observable.of(fetchCustomersFailure(error.message)))
}