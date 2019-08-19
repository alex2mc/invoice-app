import 'rxjs/add/operator/switchMap';

import { ajax } from 'rxjs/observable/dom/ajax';


const url = 'https://api.invoice-app.2muchcoffee.com/api/products';

class ProductsRequestsService {

  getProducts(input){
  
      return ajax
        .getJSON(url)

}
}



export const requestsService = new ProductsRequestsService();