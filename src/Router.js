import React from 'react'
import { Route } from 'react-router-dom'

import MainPage from './components/MainPage/MainPage'
import Products from './components/Products/Products';
import Customers from './components/Customers/Customers';
import Invoices from './components/Invoices/Invoices';
import CreateInvoice from './components/Invoices/CreateInvoice/CreateInvoice';
import EditInvoice from "./components/Invoices/EditInvoice/EditInvoice";



export default function router() {
  return (
    <>
      <Route exact path='/' component={MainPage} />
      <Route exact path='/products' component={Products} />
      <Route exact path='/customers' component={Customers} />
      <Route exact path='/invoices' component={Invoices} />
      <Route exact path='/invoice/new' component={CreateInvoice} />
      {/*<Route exact path='/invoice/:id/view' component={InvoiceForm} />*/}
      <Route exact path='/invoice/:id/edit' component={EditInvoice} />
    </>
  );
}