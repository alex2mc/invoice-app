import { ofType } from 'redux-observable';
import { map } from 'rxjs/operators';

import { Actions as ProductsRequestActions, ActionTypes as ProductsRequestsActionTypes } from '../products-requests';

import {
  GET_PRODUCTS,
  getProductsSucceeded,
  getProductsFail
} from "./actions";




export const getProductsRequest = (action$) =>
  action$.pipe(
    ofType(GET_PRODUCTS),
    map(() =>
      ProductsRequestActions.getProducts.action(),
    ),
  );

export const getProductsRequestSuccess = (action$) =>
  action$.pipe(
    ofType(ProductsRequestsActionTypes.getProductsActionTypes.ACTION_SUCCEEDED),
    map((action) => getProductsSucceeded(action.payload))
)

export const getProductsRequestFail = (action$) =>
  action$.pipe(
    ofType(ProductsRequestsActionTypes.getProductsActionTypes.ACTION_FAILED),
    map((action) => getProductsFail(action.payload))
  )


export const epics = [
  getProductsRequest,
  getProductsRequestSuccess,
  getProductsRequestFail
];