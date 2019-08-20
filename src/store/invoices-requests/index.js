import { combineReducers } from 'redux';

import {
  Actions as getInvoices,
  ActionTypes as getInvoicesActionTypes,
  epic as getInvoicesEpic,
  reducer as getInvoicesReducer,
} from './nested-states/get-invoices';


export const Actions = {
  getInvoices,
};

export const ActionTypes = {
  getInvoicesActionTypes,
};

export const reducer = combineReducers({
  getInvoices: getInvoicesReducer,
});


export const epics = [
  getInvoicesEpic,
];

export const State = reducer;