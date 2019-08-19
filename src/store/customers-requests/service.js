import 'rxjs/add/operator/switchMap';

import { ajax } from 'rxjs/observable/dom/ajax';


const url = 'https://api.invoice-app.2muchcoffee.com/api/customers';

class CustomersRequestsService {

  getCustomers(input){
  
      return ajax
        .getJSON(url)
        // .map(customers => customers.map(customer => ({
        //   id: customer._id,
        //   name: customer.name,
        //   address: customer.address,
        //   phone: customer.phone,
        // })))

}
}



export const requestsService = new CustomersRequestsService();