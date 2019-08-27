import { asyncActionHandlerFactory } from '../../utils/async-action-helper';

import { requestsService } from '../service';


const { effect, reducer, ActionTypes, Actions } = asyncActionHandlerFactory(
  'GET_CUSTOMERS_REQUEST',
);

const epic = (actions$) => effect(actions$, () => requestsService.getCustomers());

export { epic, reducer, Actions, ActionTypes };
