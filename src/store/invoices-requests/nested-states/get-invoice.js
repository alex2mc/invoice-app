import { asyncActionHandlerFactory } from '../../utils/async-action-helper';

import { requestsService } from '../service';


const { effect, reducer, ActionTypes, Actions } = asyncActionHandlerFactory('GET_INVOICE_REQUEST');

const epic = (actions$) => effect(actions$, (id) => requestsService.getInvoice(id));

export { epic, reducer, Actions, ActionTypes };