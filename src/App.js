import React, {Component} from 'react';

import { BrowserRouter } from 'react-router-dom'
import Router from './Router'

import NavTabs from './components/NavTabs/NavTabs'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import './App.css';
import { getProducts } from './store/products/actions';
import { getCustomers } from './store/customers/actions';
import { getInvoices } from './store/invoices/actions';



class App extends Component {

 componentDidMount() {
   this.props.getCustomers();
   this.props.getProducts();
   this.props.getInvoices()
 }

  render () {

  return (
    <BrowserRouter>
        <NavTabs />
        <Router />
    </BrowserRouter>
  );
}}

// const mapStateToProps = state => ({ ...state });
//
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getCustomers,
    getProducts,
    getInvoices
  }, dispatch);


export default
connect(null, mapDispatchToProps)(
  App
);
