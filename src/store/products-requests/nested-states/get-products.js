import { asyncActionHandlerFactory } from '../../utils/async-action-helper';

import { requestsService } from '../service';


const { effect, reducer, ActionTypes, Actions } = asyncActionHandlerFactory(
  'GET_PRODUCTS_REQUEST',
);

const epic = (actions$) => effect(actions$, (input) => requestsService.getProducts(input));

export { epic, reducer, Actions, ActionTypes };