import React from 'react'
import { Route } from 'react-router-dom'

import ViewMode from './components/Invoices/Modes/ViewMode'
import MainPage from './components/MainPage/MainPage'

import Products from './components/Products/Products';
import Customers from './components/Customers/Customers';
import Invoices from './components/Invoices/Invoices';



export default function router() {
  return (
    <>
      <Route exact path='/viewmode' component={ViewMode} />

      <Route exact path='/' component={MainPage} />
      <Route exact path='/products' component={Products} />
      <Route exact path='/customers' component={Customers} />
      <Route exact path='/invoices' component={Invoices} />
      {/*<Route exact path='/newinvoice' component={Invoices} />*/}
    </>
  );
}