import { asyncActionHandlerFactory } from '../../utils/async-action-helper';

import { requestsService } from '../service';


const { effect, reducer, ActionTypes, Actions } = asyncActionHandlerFactory('UPDATE_INVOICE_REQUEST');

const epic = (actions$) =>
  effect(actions$, (payload) => requestsService.updateInvoice(payload));

export { epic, reducer, Actions, ActionTypes };