import { asyncActionHandlerFactory } from '../../utils/async-action-helper';

import { requestsService } from '../service';


const { effect, reducer, ActionTypes, Actions } = asyncActionHandlerFactory(
  'GET_CUSTOMERS_REQUEST',
);

const epic = (actions$) => effect(actions$, (input) => requestsService.getCustomers(input));

export { epic, reducer, Actions, ActionTypes };
