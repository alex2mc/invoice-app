import { fetchCustomersEpic } from './customers/epics';
import { fetchProductsEpic } from './products/epics';
import { fetchInvoicesEpic, postInvoiceEpic, getInvoicesListEpic, deleteInvoiceEpic, editInvoiceEpic } from './invoices/epics';


import productsReducer from "./products/reducers";
import customersReducer from "./customers/reducers";
import invoicesReducer from "./invoices/reducers";
import {reducer as formReducer} from "redux-form";

import { applyMiddleware, combineReducers, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { composeWithDevTools } from 'redux-devtools-extension';



export const rootReducer = combineReducers({
  products: productsReducer,
  customers: customersReducer,
  invoices: invoicesReducer,
  form: formReducer
});

const rootEpic = combineEpics(
  fetchCustomersEpic,
  fetchProductsEpic,
  fetchInvoicesEpic,
  postInvoiceEpic,
  getInvoicesListEpic,
  deleteInvoiceEpic,
  editInvoiceEpic
);

const epicMiddleware = createEpicMiddleware();


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(epicMiddleware)));

epicMiddleware.run(rootEpic);

export default store;