import 'rxjs/add/operator/switchMap';

import { ajax } from 'rxjs/observable/dom/ajax';


const url = 'https://api.invoice-app.2muchcoffee.com/api/invoices';

class InvoicesRequestsService {

  getInvoices(input){

    return ajax
      .getJSON(url)

  }
}



export const requestsService = new InvoicesRequestsService();