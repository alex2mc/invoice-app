import { Epic } from 'redux-observable';
// import { Action } from 'typesafe-actions';

import { Observable } from 'rxjs';

// import { Offer } from '../../../shared/interfaces/offer';

import { asyncActionHandlerFactory } from '../../utils/async-action-helper';

import { requestsService } from '../service';

const { effect, reducer, ActionTypes, Actions } = asyncActionHandlerFactory('GET_OFFER_REQUEST');

const epic = (actions$) => effect(actions$, (id) => requestsService.getCustomer(id));

export { epic, reducer, Actions, ActionTypes };