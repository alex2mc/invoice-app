import { createSelector } from 'reselect';

import { RootState } from '../index';


export const getState = (state = RootState) => state.customersRequests;




export const getGetCustomersRequestState = createSelector(
  getState,
  (state) => state.getCustomers,
);

export const getIsCustomersLoading = createSelector(
  getGetCustomersRequestState,
  (state) => state.loading,
);