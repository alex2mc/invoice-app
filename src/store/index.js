import {combineEpics} from 'redux-observable';
import { fetchCustomersEpic } from './customers/epics';
import { fetchProductsEpic } from './products/epics';
import { fetchInvoicesEpic, postInvoiceEpic, getInvoicesListEpic, deleteInvoiceEpic, editInvoiceEpic } from './invoices/epics';




export const rootEpic = combineEpics(
  fetchCustomersEpic,
  fetchProductsEpic,
  fetchInvoicesEpic,
  postInvoiceEpic,
  getInvoicesListEpic,
  deleteInvoiceEpic,
  editInvoiceEpic
);