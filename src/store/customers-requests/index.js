import { combineReducers } from 'redux';

// import { ActionType, StateType } from 'typesafe-actions';

// import { unauthorizedErrorEpic } from '../utils/unauthorized-error-epic';

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

// export type ActionTypeUnion = ActionType<typeof reducer>;

export const epics = [
  getCustomerEpic,
  getCustomersEpic,
  // unauthorizedErrorEpic(getCustomersActionTypes.ACTION_FAILED),
];

export const State = reducer;