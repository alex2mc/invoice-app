import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchInvoices, getInvoicesList, deleteInvoice } from '../../store/actions/invoices';

import Spinner from '../UI/Spinner/Spinner';

import Invoice from "./Invoice";
import StyledTableCell from "../UI/Table/StyledTableCell";



const styles = theme => ({
  root: {
    width: '95%',
    marginTop: theme.spacing(3),
    marginLeft: 'auto',
    marginRight: 'auto',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});




class CommonContent extends Component {

  componentDidMount() {
    this.props.fetchInvoices();
  }


  render() {

    // console.log(this.props)

    const {
      isLoading,
      isCustomerLoading,
      // error,
      invoices,
      customers,
      classes
    } = this.props;




    const invoicesRows  =  invoices
      ? invoices.map(invoice => (
        <Invoice key={invoice.id} customers={customers} {...invoice} /> ))
      : null

    if(isLoading && isCustomerLoading)  {
      return <Spinner />
    }

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Invoiсe ID</StyledTableCell>
              <StyledTableCell>Customer Name</StyledTableCell>
              <StyledTableCell>Discount (%)</StyledTableCell>
              <StyledTableCell>Total</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {invoicesRows}

          </TableBody>
        </Table>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    invoices: state.invoice.invoices,
    customers: state.customer.customers,
    isLoading: state.invoice.isLoading,
    isCustomerLoading: state.customer.isLoading
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchInvoices,
    getInvoicesList,
    deleteInvoice
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CommonContent));