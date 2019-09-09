import { createSelector } from 'reselect';

import { RootState } from '../index';



export const getState = (state = RootState) => state.invoicesRequests;


export const getGetInvoicesRequestState = createSelector(
  getState,
  (state) => state.getInvoices,
);

export const getIsInvoicesLoading = createSelector(
  getGetInvoicesRequestState,
  (state) => state.loading,
);

export const getPostInvoiceRequestState = createSelector(
  getState,
  (state) => state.postInvoice,
);

export const getIsPostInvoiceLoading = createSelector(
  getPostInvoiceRequestState,
  (state) => state.loading,
);

export const getGetInvoiceRequestState = createSelector(
  getState,
  (state) => state.getInvoice,
);

export const getIsGetInvoiceLoading = createSelector(
  getGetInvoiceRequestState,
  (State) => State.loading,
);

export const getGetInvoiceItemsRequestState = createSelector(
  getState,
  (state) => state.getInvoiceItems,
);

export const getIsGetInvoiceItemsLoading = createSelector(
  getGetInvoiceItemsRequestState,
  (state) => state.loading,
);

export const getIsGetInvoiceItemsLoaded = createSelector(
  getGetInvoiceItemsRequestState,
  (state) => state.loaded,
);