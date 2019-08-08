import React, {Component} from 'react';

import NavTabs from './components/NavTabs/NavTabs'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import './App.css';
import {fetchProducts} from "./store/actions/products";
import { fetchCustomers } from './store/actions/customers';
import { fetchInvoices} from './store/actions/invoices';


class App extends Component {

 componentDidMount() {
   this.props.fetchCustomers()
   this.props.fetchProducts()
   this.props.fetchInvoices()
 }

  render () {

  return (
    <div className="App">
        <NavTabs />
    </div>
  );
}}

// const mapStateToProps = state => ({ ...state });
//
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchCustomers,
    fetchProducts,
    fetchInvoices
  }, dispatch);


export default
connect(null, mapDispatchToProps)(
  App
);
