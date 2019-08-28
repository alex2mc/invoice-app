import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getInvoices } from '../../store/invoices/actions';

import { getInvoicesArray } from '../../store/invoices/selectors';
import { getEntities as getCustomers } from '../../store/customers/selectors';

// import Spinner from '../UI/Spinner/Spinner';

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
    // this.props.fetchInvoices();
  }


  render() {

    // console.log(this.props.invoices)

    const {
      invoices,
      customers,
      classes
    } = this.props;




    const invoicesRows  =  invoices
      ? invoices.map(invoice => (
        <Invoice key={invoice._id} customers={customers} inv_id={invoice._id} {...invoice} /> ))
      : null;

    // if(isLoading && isCustomerLoading)  {
    //   return <Spinner />
    // }

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
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
}

const mapStateToProps = state => {
  return {
    invoices: getInvoicesArray(state),
    customers: getCustomers(state),
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getInvoices
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CommonContent));