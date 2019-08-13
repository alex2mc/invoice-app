import {combineEpics} from 'redux-observable';
import { fetchProductsEpic} from './products';
import { fetchCustomersEpic } from './customers';
import { fetchInvoicesEpic, postInvoiceEpic, getInvoicesListEpic } from './invoices';



export const rootEpic = combineEpics(
  fetchProductsEpic,
  fetchCustomersEpic,
  fetchInvoicesEpic,
  postInvoiceEpic,
  getInvoicesListEpic
);