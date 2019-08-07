import {combineEpics} from 'redux-observable';
import { fetchProductsEpic} from './products';



export const rootEpic = combineEpics(fetchProductsEpic);