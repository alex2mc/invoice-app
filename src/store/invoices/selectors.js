import { createSelector } from 'reselect';


// selector
const getInvoices = (state) => state.invoices.invoices;
// reselect function
export const getInvoicesState = createSelector(
  [ getInvoices ],
  (invoices) => invoices
);