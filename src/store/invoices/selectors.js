import { createSelector } from 'reselect';


// selector
const getInvoices = (state) => state.invoices.invoices;
// reselect function
export const getInvoicesState = createSelector(
  [ getInvoices ],
  (invoices) => invoices
);

const getInvoice = (state) => state.invoices.invoice;
// reselect function
export const getInvoiceState = createSelector(
  [ getInvoice ],
  (invoice) => invoice
);

const getInvoiceItems = (state) => state.invoices.invoiceItems;
// reselect function
export const getInvoiceItemsState = createSelector(
  [ getInvoiceItems ],
  (invoiceItems) => invoiceItems
);