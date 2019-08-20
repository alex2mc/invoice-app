import { applyMiddleware, combineReducers, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { composeWithDevTools } from 'redux-devtools-extension';

import productsReducer from "./products/reducers";
import customersReducer from "./customers/reducers";
import invoicesReducer from "./invoices/reducers";
import {reducer as formReducer} from "redux-form";

import { epics as customersEpics } from './customers/epics';
import { epics as productsEpics } from './products/epics';
import { epics as invoicesEpics } from './invoices/epics';

import {
  epics as customersRequestsEpics,
  reducer as customersRequestsReducer,
} from './customers-requests';

import {
  epics as productsRequestsEpics,
  reducer as productsRequestsReducer,
} from './products-requests';

import {
  epics as invoicesRequestsEpics,
  reducer as invoicesRequestsReducer,
} from './invoices-requests';



export const rootReducer = combineReducers({
  products: productsReducer,
  productsRequests: productsRequestsReducer,
  customers: customersReducer,
  customersRequests: customersRequestsReducer,
  invoices: invoicesReducer,
  invoicesRequests: invoicesRequestsReducer,
  form: formReducer
});

export const RootState =  rootReducer;

const rootEpic = combineEpics(
  ...customersEpics,
  ...customersRequestsEpics,
  ...productsEpics,
  ...productsRequestsEpics,
  ...invoicesEpics,
  ...invoicesRequestsEpics,
);

const epicMiddleware = createEpicMiddleware();


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(epicMiddleware)));

epicMiddleware.run(rootEpic);

export default store;