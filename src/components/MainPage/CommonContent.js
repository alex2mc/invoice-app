import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchInvoices, getInvoicesList } from '../../store/actions/invoices';

import Spinner from '../UI/Spinner/Spinner';
import Button from "@material-ui/core/Button";

import { Link } from 'react-router-dom';



const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);




class CommonContent extends Component {
  state = {

  }

  componentDidMount() {
    this.props.fetchInvoices();
  }

  handleClick = (id) => {

    this.props.getInvoicesList(id)
  }

  render() {

    // console.log(this.props)

    const {
      isLoading,
      isCustomerLoading,
      // error,
      invoices,
      customers
    } = this.props;




    const invoicesRows  =  invoices
      ? invoices.map(invoice => (
        <StyledTableRow key={invoice.id} >
          <StyledTableCell component="th" scope="row">{invoice.id}</StyledTableCell>
          <StyledTableCell>

            {customers &&
              (customers.find(customer => customer.id === invoice.customer ) || { name: 'Unnamed' }).name
            }

          </StyledTableCell>
          <StyledTableCell>{invoice.discount}</StyledTableCell>
          <StyledTableCell>{invoice.total}</StyledTableCell>
          <StyledTableCell>
            <Link to={`/viewmode/${invoice.id}`}>
              <Button variant="contained" color="primary" onClick={() => this.handleClick(invoice.id)}> View </Button>
            </Link>
            {this.props.buttons}

          </StyledTableCell>

        </StyledTableRow>

      ))
      : null

    if(isLoading && isCustomerLoading)  {
      return <Spinner />
    }

    return (
      <Paper>
        <Table>
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

const mapStateToProps =  state => {
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
    getInvoicesList
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CommonContent);