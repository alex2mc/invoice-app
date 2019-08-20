import { asyncActionHandlerFactory } from '../../utils/async-action-helper';

import { requestsService } from '../service';


const { effect, reducer, ActionTypes, Actions } = asyncActionHandlerFactory('POST_INVOICE_ITEMS_REQUEST');

const epic = (actions$) =>
  effect(actions$, (payload) => requestsService.postInvoiceItems(payload));

export { epic, reducer, Actions, ActionTypes };