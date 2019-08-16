import { Epic } from 'redux-observable';
// import { Action } from 'typesafe-actions';

import { Observable } from 'rxjs';

// import { Offer } from '../../../shared/interfaces/offer';
// import { PaginationInput } from '../../../shared/types/pagination';

import { asyncActionHandlerFactory } from '../../utils/async-action-helper';

import { requestsService } from '../service';

const { effect, reducer, ActionTypes, Actions } = asyncActionHandlerFactory(
  'GET_OFFERS_REQUEST',
);

const epic = (actions$) => effect(actions$, (input) => requestsService.getCustomers(input));

export { epic, reducer, Actions, ActionTypes };
