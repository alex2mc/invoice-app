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

import {
  Actions as deleteInvoice,
  ActionTypes as deleteInvoiceActionTypes,
  epic as deleteInvoiceEpic,
  reducer as deleteInvoiceReducer,
} from './nested-states/delete-invoice';

import {
  Actions as getInvoiceItems,
  ActionTypes as getInvoiceItemsActionTypes,
  epic as getInvoiceItemsEpic,
  reducer as getInvoiceItemsReducer,
} from './nested-states/get-invoice-items';

export const Actions = {
  getInvoices,
  postInvoice,
  postInvoiceItems,
  deleteInvoice,
  getInvoiceItems
};

export const ActionTypes = {
  getInvoicesActionTypes,
  postInvoiceActionTypes,
  postInvoiceItemsActionTypes,
  deleteInvoiceActionTypes,
  getInvoiceItemsActionTypes
};

export const reducer = combineReducers({
  getInvoices: getInvoicesReducer,
  postInvoice: postInvoiceReducer,
  postInvoiceItems: postInvoiceItemsReducer,
  deleteInvoiceItems: deleteInvoiceReducer,
  getInvoiceItems: getInvoiceItemsReducer
});


export const epics = [
  getInvoicesEpic,
  postInvoiceEpic,
  postInvoiceItemsEpic,
  deleteInvoiceEpic,
  getInvoiceItemsEpic
];

export const State = reducer;