import React, {Component} from 'react';

import NavTabs from './components/NavTabs/NavTabs'

// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';


import './App.css';
// import {fetchProducts} from "./store/actions/products";
// import { fetchCustomers } from './store/actions/customers';


class App extends Component {

 // componentDidMount() {
 //   this.props.fetchCustomers()
 // }

  render () {

  return (
    <div className="App">
        <NavTabs />
    </div>
  );
}}

// const mapStateToProps = state => ({ ...state });
//
// const mapDispatchToProps = dispatch =>
//   bindActionCreators({
//     fetchCustomers
//
//   }, dispatch);


export default
// connect(mapStateToProps, mapDispatchToProps)(
  App
// );
