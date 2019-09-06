import { createSelector } from 'reselect';

import { RootState } from '../index';
import { State } from './index';


export const getState = (state = RootState) => state.invoicesRequests;


export const getGetInvoicesRequestState = createSelector(
  getState,
  (state) => state.getInvoices,
);

export const getIsInvoicesLoading = createSelector(
  getGetInvoicesRequestState,
  (state = State) => state.loading,
);

export const getPostInvoiceRequestState = createSelector(
  getState,
  (State) => State.postInvoice,
);

export const getIsPostInvoiceLoading = createSelector(
  getPostInvoiceRequestState,
  (State) => State.loading,
);
