import { combineReducers } from 'redux';

import {
  Actions as getProduct,
  ActionTypes as getProductActionTypes,
  epic as getProductEpic,
  reducer as getProductReducer,
} from './nested-states/get-product';

import {
  Actions as getProducts,
  ActionTypes as getProductsActionTypes,
  epic as getProductsEpic,
  reducer as getProductsReducer,
} from './nested-states/get-products';


export const Actions = {
  getProduct,
  getProducts,
};

export const ActionTypes = {
  getProductActionTypes,
  getProductsActionTypes,
};

export const reducer = combineReducers({
  getProduct: getProductReducer,
  getProducts: getProductsReducer,
});

export const epics = [
  getProductEpic,
  getProductsEpic,
];

export const State = reducer;