import {combineEpics} from 'redux-observable';
import { fetchProductsEpic} from './products';
import { fetchCustomersEpic } from './customers';



export const rootEpic = combineEpics(
  fetchProductsEpic,
  fetchCustomersEpic
);