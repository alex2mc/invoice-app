import { map } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { Actions as CustomersRequestActions, ActionTypes as CustomersRequestsActionTypes } from '../customers-requests';

import {
  GET_CUSTOMERS,
  getCustomersSucceeded,
  getCustomersFail
} from "./actions";



export const getCustomersRequest = (action$) =>
  action$.pipe(
    ofType(GET_CUSTOMERS),
    map(() =>
      CustomersRequestActions.getCustomers.action(),
    ),
  );

export const getCustomersRequestSuccess = (action$) =>
  action$.pipe(
    ofType(CustomersRequestsActionTypes.getCustomersActionTypes.ACTION_SUCCEEDED),
    map((action) => getCustomersSucceeded(action.payload))
  )

export const getCustomersRequestFail = (action$) =>
  action$.pipe(
    ofType(CustomersRequestsActionTypes.getCustomersActionTypes.ACTION_FAILED),
    map(({ payload, meta }) => getCustomersFail({ payload, meta })),
  )



export const epics = [
  getCustomersRequest,
  getCustomersRequestSuccess,
  getCustomersRequestFail,
];