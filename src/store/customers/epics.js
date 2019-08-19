import { ofType } from 'redux-observable';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import { map } from 'rxjs/operators';

import { transferActionEpicFactory } from '../utils/transfer-action';
import { Actions as CustomersRequestActions, ActionTypes as OffersRequestsActionTypes } from '../customers-requests';

import {
  // GET_CURRENT_CUSTOMER,
  // getCurrentCustomerSucceeded,
  // getCurrentCustomerFail,
  GET_CUSTOMERS,
  getCustomersSucceeded,
  getCustomersFail
} from "./actions";


// const url = 'https://api.invoice-app.2muchcoffee.com/api/customers';

// export const getCurrentCustomerRequest = (action$) =>
//   action$.pipe(
//     ofType(GET_CURRENT_CUSTOMER),
//     map(({ type, payload }) =>
//       CustomersRequestActions.getCustomer.action(payload, type),
//     ),
//   );

// export const getCurrentOfferRequestSuccess = transferActionEpicFactory(
//   OffersRequestsActionTypes.getCustomerActionTypes.ACTION_SUCCEEDED,
//   getCurrentuCstomerSucceeded,
//   GET_CURRENT_CUSTOMER,
// );

// export const getCurrentOfferRequestFail = transferActionEpicFactory(
//   OffersRequestsActionTypes.getCustomerActionTypes.ACTION_FAILED,
//   getCurrentCustomerFail,
//   GET_CURRENT_CUSTOMER,
// );


export const getCustomersRequest = (action$) =>
  action$.pipe(
    ofType(GET_CUSTOMERS),
    map(() =>
      CustomersRequestActions.getCustomers.action(),
    ),
  );

export const getCustomersRequestSuccess = transferActionEpicFactory(
  OffersRequestsActionTypes.getCustomersActionTypes.ACTION_SUCCEEDED,
  getCustomersSucceeded,
  GET_CUSTOMERS,
);

export const getCustomersRequestFail = transferActionEpicFactory(
  OffersRequestsActionTypes.getCustomersActionTypes.ACTION_FAILED,
  getCustomersFail,
  GET_CUSTOMERS,
);


export const epics = [
  getCustomersRequest,
  getCustomersRequestSuccess,
  getCustomersRequestFail,

];