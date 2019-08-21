import { ofType } from 'redux-observable';
// import React from "react";

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import { map } from 'rxjs/operators';

// import { Redirect } from 'react-router-dom';

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
  updateInvoiceFail
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

        const payload = {invoice_id, product_id, quantity};
      return InvoicesRequestActions.postInvoiceItems.action(payload)
      },
      ),
  );

export const continueOnPostInvoiceItemsSuccess = (action$) =>
  action$.pipe(
    ofType("POST_INVOICE_ITEMS_REQUEST_SUCCEEDED"),
    map(
      () => {
        // console.log("FETCHING");
        {/*<Redirect to="/invoices"/>*/}
        return InvoicesRequestActions.getInvoices.action();
      }
    )
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

export const continueOnDeleteInvoiceSuccess = (action$) =>
  action$.pipe(
    ofType("DELETE_INVOICE_REQUEST_SUCCEEDED"),
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

export const continueOnGetInvoiceSuccess = (action$) =>
  action$.pipe(
    ofType("GET_INVOICE_REQUEST_SUCCEEDED"),
    map(
      (response) => {
      const id = response.payload.customer_id;
      return CustomersRequestActions.getCustomer.action(id)
      },
      ),
  );

export const continueOnGetInvoiceItemsSuccess = (action$) =>
  action$.pipe(
    ofType("GET_INVOICE_ITEMS_REQUEST_SUCCEEDED"),
    map(
      (response) => {       
        console.log(response.payload);
      return ProductsRequestActions.getProduct.action()
      },
      ),
  );

export const updateInvoiceRequest = (action$) =>
  action$.pipe(
    ofType(UPDATE_INVOICE),
    map(
      (response) => {
        // console.log(JSON.parse(response.payload.request.body));
        // const customer_id = JSON.parse(response.payload.request.body).customer_id;
        // const discount = JSON.parse(response.payload.request.body).discount;
        // const total = JSON.parse(response.payload.request.body).total;
        // const invoice_id = response.payload.response._id;
        //
        // const payload = {invoice_id, customer_id, discount, total};
        const payload = {response};
        return InvoicesRequestActions.updateInvoice.action(payload)
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
  continueOnPostInvoiceSuccess,
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
  continueOnPostInvoiceItemsSuccess,
  continueOnDeleteInvoiceSuccess,
  updateInvoiceRequest,
  updateInvoiceRequestSuccess,
  updateInvoiceRequestFail
  // continueOnGetInvoiceItemsSuccess
];
