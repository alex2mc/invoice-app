import React, { Component } from 'react';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCustomers } from '../../../store/actions/customers';

import MenuItem from "@material-ui/core/MenuItem";
import Spinner from "../../UI/Spinner/Spinner";



class Customers extends Component {
  render() {
    const {
      isLoading,
      // error,
      customers
    } = this.props;

    const customersRows =  isLoading
      ? <Spinner />
      : customers.map(customer => (
        <MenuItem key={customer.id} value={customer.name}>{customer.name}</MenuItem>
      ))

    return (
      <>
        {customersRows}
      </>
    );
  }
}

const mapStateToProps =  state => {
  return {
    customers: state.customer.customers,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchCustomers
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Customers);