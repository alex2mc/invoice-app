import { getCustomersEpic } from './customers/epics';
import { fetchProductsEpic } from './products/epics';
import { fetchInvoicesEpic, postInvoiceEpic, getInvoicesListEpic, deleteInvoiceEpic, editInvoiceEpic, } from './invoices/epics';


import productsReducer from "./products/reducers";
import customersReducer from "./customers/reducers";
import invoicesReducer from "./invoices/reducers";
import {reducer as formReducer} from "redux-form";

import { applyMiddleware, combineReducers, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { composeWithDevTools } from 'redux-devtools-extension';

import {
  // ActionTypeUnion as OffersRequestActionTypeUnion,
  epics as customersRequestsEpics,
  reducer as customersRequestsReducer,
} from './customers-requests';



export const rootReducer = combineReducers({
  products: productsReducer,
  customers: customersReducer,
  customersRequests: customersRequestsReducer,
  invoices: invoicesReducer,
  form: formReducer
});

export const RootState =  rootReducer;

const rootEpic = combineEpics(
  ...customersRequestsEpics,
  // getCustomersEpic,
  fetchProductsEpic,
  fetchInvoicesEpic,
  postInvoiceEpic,
  getInvoicesListEpic,
  deleteInvoiceEpic,
  editInvoiceEpic,
);

const epicMiddleware = createEpicMiddleware();


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(epicMiddleware)));

epicMiddleware.run(rootEpic);

export default store;