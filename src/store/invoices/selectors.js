import { createSelector } from 'reselect';

import { RootState } from '../index';


export const getInvoicesState = (state = RootState) => state.invoices;


export const getEntities = createSelector(
  getInvoicesState,
  (state ) => state.entities,
);


export const getInvoicesArray = createSelector(
  getInvoicesState,
  getEntities,
  (state , entities) => state.ids.map((id) => entities[id]),
)

export const getInvoiceItemsArray = createSelector(
  getInvoicesState,
  (state) => state.invoiceItems
)