import {combineEpics} from 'redux-observable';
import { fetchCustomersEpic } from './customers/epics';




export const rootEpic = combineEpics(
  fetchCustomersEpic,
);