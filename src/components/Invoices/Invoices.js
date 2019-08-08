import React, { Component } from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchInvoices } from '../../store/actions/invoices';

import Spinner from '../UI/Spinner/Spinner';




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


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}));


class Invoices extends Component {

  componentDidMount() {
    this.props.fetchInvoices();

  }

  render() {
    // const classes = useStyles();
    // console.log(this.props)

    const {
      isLoading,
      error,
      invoices,
      customers
    } = this.props;

    const invoicesRows = isLoading && !customers
      ? <Spinner />
      :  invoices.map(invoice => (
          <StyledTableRow key={invoice.id} >
            <StyledTableCell component="th" scope="row">{invoice.id}</StyledTableCell>
            <StyledTableCell>

              {customers.find(customer => (
                customer.id === invoice.customer )).name}

            </StyledTableCell>
            <StyledTableCell>{invoice.discount}</StyledTableCell>
            <StyledTableCell>{invoice.total}</StyledTableCell>
            <StyledTableCell>
              <Button variant="contained" color="secondary"> View </Button>
              <Button variant="contained" color="secondary"> Edit </Button>
              <Button variant="contained" color="secondary"> Delete </Button>
            </StyledTableCell>

          </StyledTableRow>

        ))


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
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchInvoices,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Invoices);