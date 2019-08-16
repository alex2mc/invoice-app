// import { execute } from 'apollo-link';
// import gql from 'graphql-tag';

// import { from, Observable, Subscribable, switchMap } from 'rxjs';

import 'rxjs/add/operator/switchMap';

import { ajax } from 'rxjs/observable/dom/ajax';

// import { responseInterceptor } from '../utils/response-interceptor';
// import { switchMap } from "rxjs";

// import { Offer, offerFragment, shrinkedOfferFragment } from '../../shared/interfaces/offer';
// import { PurchaseOfferFormData } from '../../shared/interfaces/purchase-offer-form-data';
// import link from '../../shared/link';
// import { GraphQLResponse } from '../../shared/types/graphql';
// import { PaginationInput, PaginationResult } from '../../shared/types/pagination';

// const url = 'https://api.invoice-app.2muchcoffee.com/api/customers';

class CustomersRequestsService {

  getCustomers(input){
  debugger
      return ajax
        .getJSON('https://api.invoice-app.2muchcoffee.com/api/customers')

        // .map(customers => customers.map(customer => ({
        //   id: customer._id,
        //   name: customer.name,
        //   address: customer.address,
        //   phone: customer.phone,
        // })))

}
}



export const requestsService = new CustomersRequestsService();