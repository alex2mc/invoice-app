import React, { useEffect } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import StyledTableCell from "../UI/Table/StyledTableCell";
import StyledTableRow from "../UI/Table/StyledTableRow";
import { styles } from "../UI/shared/styles";

import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCustomers } from '../../store/customers/actions';

import { getCustomersArray } from '../../store/customers/selectors';



const Customers = ({ getCustomers, ...props}) => {

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  const customers = useSelector(state => getCustomersArray(state))

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


const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getCustomers
  }, dispatch);

export default connect(null, mapDispatchToProps)(Customers);