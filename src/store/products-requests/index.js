import { combineReducers } from 'redux';



import {
  Actions as getProducts,
  ActionTypes as getProductsActionTypes,
  epic as getProductsEpic,
  reducer as getProductsReducer,
} from './nested-states/get-products';


export const Actions = {
    getProducts,
};

export const ActionTypes = {
    getProductsActionTypes,
};

export const reducer = combineReducers({
    getProducts: getProductsReducer,
});

export const epics = [
    getProductsEpic,
];

export const State = reducer;