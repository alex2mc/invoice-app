import { createSelector } from 'reselect';

import { RootState } from '../index';
import { State } from './index';

// export const getState = (state) => state.customersRequest;
export const getState = (state = RootState) => state.customersRequests;

// export const getState = (state: RootState) => state.offersRequest;




export const getGetOffersRequestState = createSelector(
  getState,
  (state = State) => state.getCustomers,
);

export const getIsOffersLoading = createSelector(
  getGetOffersRequestState,
  (state = State) => state.loading,
);
