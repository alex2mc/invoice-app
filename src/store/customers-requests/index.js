import { combineReducers } from 'redux';

import {
  Actions as getCustomer,
  ActionTypes as getCustomerActionTypes,
  epic as getCustomerEpic,
  reducer as getCustomerReducer,
} from './nested-states/get-customer';

import {
  Actions as getCustomers,
  ActionTypes as getCustomersActionTypes,
  epic as getCustomersEpic,
  reducer as getCustomersReducer,
} from './nested-states/get-customers';


export const Actions = {
  getCustomer,
  getCustomers,
};

export const ActionTypes = {
  getCustomerActionTypes,
  getCustomersActionTypes,
};

export const reducer = combineReducers({
  getCustomer: getCustomerReducer,
  getCustomers: getCustomersReducer,
});


export const epics = [
  getCustomerEpic,
  getCustomersEpic,
];

export const State = reducer;