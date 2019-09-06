import React, { useEffect } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getInvoices } from '../../store/invoices/actions';
import { getCustomers } from '../../store/customers/actions';

import { getInvoicesArray } from '../../store/invoices/selectors';
import { getEntities as getCustomersEntities } from '../../store/customers/selectors';

import Invoice from "./InvoiceListItem/InvoiceListItem";
import StyledTableCell from "../UI/Table/StyledTableCell";

import { styles } from './styles';






const Invoices = ({getInvoices, getCustomers, ...props}) => {
  useEffect(() => {
    getInvoices();
  }, [getInvoices]);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  const customers = useSelector(state => getCustomersEntities(state))
  const invoices = useSelector(state => getInvoicesArray(state))

  const invoicesRows  =  invoices
    ? invoices.map(invoice => (
      <Invoice key={invoice._id} customers={customers} inv_id={invoice._id} {...invoice} /> ))
    : null;


  return (
    <Paper style={styles.root}>
      <Table style={styles.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Invoiсe ID</StyledTableCell>
            <StyledTableCell>Customer Name</StyledTableCell>
            <StyledTableCell>Discount (%)</StyledTableCell>
            <StyledTableCell>Total</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {invoicesRows}

        </TableBody>
      </Table>
    </Paper>
  );
}


const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getInvoices,
    getCustomers
  }, dispatch);

export default connect(null, mapDispatchToProps)(Invoices);