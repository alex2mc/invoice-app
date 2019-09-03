import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import StyledTableCell from "../UI/Table/StyledTableCell";
import StyledTableRow from "../UI/Table/StyledTableRow";
import { styles } from "../UI/shared/styles";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCustomers } from '../../store/customers/actions';

import { getCustomersArray } from '../../store/customers/selectors';



class Customers extends Component {

  render () {

    const {
      customers
    } = this.props;

    const customersRows = customers.map(customer => (
      <StyledTableRow key={customer._id}>
        <StyledTableCell component="th" scope="row">{customer.name}</StyledTableCell>
        <StyledTableCell>{customer.address}</StyledTableCell>
        <StyledTableCell>{customer.phone}</StyledTableCell>
      </StyledTableRow>
    ))


    return (
      <Paper style={styles.root}>
        <Table style={styles.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Customer Name</StyledTableCell>
              <StyledTableCell>Customer Address</StyledTableCell>
              <StyledTableCell>Customer Phone Number</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {customersRows}

          </TableBody>
        </Table>
      </Paper>
    );
  }
}

const mapStateToProps =  state => {
  return {
    customers: getCustomersArray(state),
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getCustomers
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Customers);