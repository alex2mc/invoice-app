import { combineReducers } from 'redux';

import {
  Actions as getInvoices,
  ActionTypes as getInvoicesActionTypes,
  epic as getInvoicesEpic,
  reducer as getInvoicesReducer,
} from './nested-states/get-invoices';

import {
  Actions as postInvoice,
  ActionTypes as postInvoiceActionTypes,
  epic as postInvoiceEpic,
  reducer as postInvoiceReducer,
} from './nested-states/post-invoice';

import {
  Actions as postInvoiceItems,
  ActionTypes as postInvoiceItemsActionTypes,
  epic as postInvoiceItemsEpic,
  reducer as postInvoiceItemsReducer,
} from './nested-states/post-invoice-items';


export const Actions = {
  getInvoices,
  postInvoice,
  postInvoiceItems
};

export const ActionTypes = {
  getInvoicesActionTypes,
  postInvoiceActionTypes,
  postInvoiceItemsActionTypes
};

export const reducer = combineReducers({
  getInvoices: getInvoicesReducer,
  postInvoice: postInvoiceReducer,
  postInvoiceItems: postInvoiceItemsReducer
});


export const epics = [
  getInvoicesEpic,
  postInvoiceEpic,
  postInvoiceItemsEpic
];

export const State = reducer;