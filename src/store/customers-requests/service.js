import 'rxjs/add/operator/switchMap';

import { ajax } from 'rxjs/observable/dom/ajax';


const url = `https://api.invoice-app.2muchcoffee.com/api/customers`;

class CustomersRequestsService {

  getCustomers(){
  
    return ajax
      .getJSON(url)
  }

  getCustomer(id) {
    return ajax
    .getJSON(`${url}/${id}`)
  }

}



export const requestsService = new CustomersRequestsService();