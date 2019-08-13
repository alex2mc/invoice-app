import {combineEpics} from 'redux-observable';
import { fetchProductsEpic} from './products';
import { fetchCustomersEpic } from './customers';
import { fetchInvoicesEpic, postInvoiceEpic, getInvoicesListEpic, deleteInvoiceEpic } from './invoices';



export const rootEpic = combineEpics(
  fetchProductsEpic,
  fetchCustomersEpic,
  fetchInvoicesEpic,
  postInvoiceEpic,
  getInvoicesListEpic,
  deleteInvoiceEpic
);