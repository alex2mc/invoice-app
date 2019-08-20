import { asyncActionHandlerFactory } from '../../utils/async-action-helper';

import { requestsService } from '../service';


const { effect, reducer, ActionTypes, Actions } = asyncActionHandlerFactory('POST_INVOICE_REQUEST');

const epic = (actions$) =>
  effect(actions$, (invoice) => requestsService.postInvoice(invoice));

export { epic, reducer, Actions, ActionTypes };