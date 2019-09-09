import 'rxjs/add/operator/switchMap';

import { ajax } from 'rxjs/observable/dom/ajax';


const url = `https://api.invoice-app.2muchcoffee.com/api/invoices`;

class InvoicesRequestsService {

  getInvoices(){

    return ajax
      .getJSON(url)

  }

  postInvoice({items, ...invoice}) {
    return ajax
        .post(
          url,
          JSON.stringify(invoice),
          {'Content-Type': 'application/json'}
        )
  }

  postInvoiceItems(payload) {
    return ajax
      .post(
        `${url}/${payload.invoice_id}/items`,
        JSON.stringify(payload),
        {'Content-Type': 'application/json'}
      )
  }

  deleteInvoice(id) {
    return ajax
       .delete(`${url}/${id}`)
  }


  getInvoiceItems(id) {
    // debugger
    // console.log(id);
    return ajax
      .getJSON(`${url}/${id}/items`)
  }

  getInvoice(id) {
    return ajax
      .getJSON(`${url}/${id}`)
  }

  updateInvoice({items, ...invoice}) {
    return ajax
      .put(
        `${url}/${invoice.id}`,
        JSON.stringify(invoice),
        {'Content-Type': 'application/json'}
      )
  }

  updateInvoiceItems(payload) {
    console.log(payload);
    return ajax
      .put(
        `${url}/${payload.invoice_id}/items/${payload._id}`,
        JSON.stringify(payload),
        {'Content-Type': 'application/json'}
      )
  }

}



export const requestsService = new InvoicesRequestsService();