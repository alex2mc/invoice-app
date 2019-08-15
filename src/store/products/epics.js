
import { Observable } from 'rxjs';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import { ajax } from 'rxjs/observable/dom/ajax';

import {
  FETCH_PRODUCTS,
  fetchProductsSuccess,
  fetchProductsFailure
} from "./actions";


const url = 'https://api.invoice-app.2muchcoffee.com/api/products';

export function fetchProductsEpic(action$) {

  return action$
    .ofType(FETCH_PRODUCTS) // ofType(FETCH_PRODUCTS) is just a simpler version of .filter(x => x.type === FETCH_PRODUCTS)
    .switchMap(() => {
      // ajax calls from Observable return observables. This is how we generate the inner Observable
      return ajax
        .getJSON(url) // getJSON simply sends a GET request with Content-Type application/json
        // .map(data => data.results) // get the data and extract only the results
        // .map(res => res.data) // get the data and extract only the results
        .map(products => products.map(product => ({
          id: product._id,
          name: product.name,
          price: product.price
        })))// we need to iterate over the products and get only the properties we need
    })
    .map(products => fetchProductsSuccess(products)) // map the resulting array to an action of type FETCH_PRODUCTS_SUCCESS
    // every action that is contained in the stream returned from the epic is dispatched to Redux, this is why we map the actions to streams.
    // if an error occurs, create an Observable of the action to be dispatched on error. Unlike other operators, catch does not explicitly return an Observable.
    .catch(error => Observable.of(fetchProductsFailure(error.message)))
}