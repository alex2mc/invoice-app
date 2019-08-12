import React, { Component } from 'react';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCustomers } from '../../../store/actions/customers';

import MenuItem from "@material-ui/core/MenuItem";
import Spinner from "../../UI/Spinner/Spinner";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
// import Paper from "@material-ui/core/Paper";



class Customers extends Component {
  state = {
    customerName: ''
  }

  handleChange = e => {
    const {name, value} = e.target
    this.setState(state => {
      return {
        ...state,
        [name]: value
      }
    })
  }

  render() {
    console.log(this.props)
    const {
      isLoading,
      // error,
      customers
    } = this.props;

// debugger
    const customersRows = customers
    ? customers.map(customer => (
        <MenuItem key={customer.id} value={customer.name}>{customer.name}</MenuItem>

      ))
      : null

    if(isLoading) {
      return <Spinner />
    }

    return (
      <>
        <form
          // className={classes.rootForm}
          autoComplete="off">
          <FormControl
            // className={classes.formControl}
          >
            <InputLabel htmlFor="customer-name">Select Name</InputLabel>
            <Select
              value={this.state.customerName}
              onChange={this.handleChange}
              inputProps={{
                name: 'customerName',
                id: 'customer-name',
              }}
            >
              <Customers />
              {customersRows}
            </Select>
          </FormControl>
        </form>
      </>
    );
  }
}

const mapStateToProps =  state => {
  return {
    customers: state.customer.customers,
    isLoading: state.customer.isLoading
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchCustomers
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Customers);