import { ofType } from 'redux-observable';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import { map } from 'rxjs/operators';

import { transferActionEpicFactory } from '../utils/transfer-action';
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

export const getProductsRequestSuccess = transferActionEpicFactory(
  ProductsRequestsActionTypes.getProductsActionTypes.ACTION_SUCCEEDED,
  getProductsSucceeded,
  GET_PRODUCTS,
);

export const getProductsRequestFail = transferActionEpicFactory(
  ProductsRequestsActionTypes.getProductsActionTypes.ACTION_FAILED,
  getProductsFail,
  GET_PRODUCTS,
);


export const epics = [
  getProductsRequest,
  getProductsRequestSuccess,
  getProductsRequestFail
];