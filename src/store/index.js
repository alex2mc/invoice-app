import {combineEpics} from 'redux-observable';
import { fetchCustomersEpic } from './customers/epics';
import { fetchProductsEpic } from './products/epics';




export const rootEpic = combineEpics(
  fetchCustomersEpic,
  fetchProductsEpic
);