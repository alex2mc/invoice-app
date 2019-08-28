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
import { getCustomers } from '../../store/customers/actions';

import { getCustomersState } from '../../store/customers/selectors';

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


class Customers extends Component {

  componentDidMount() {
    // this.props.getCustomers();
  }

  render () {
    // console.log(this.props)

    const {
      isLoading,
      classes,
      // error,
      customers
    } = this.props;

    const customersRows = customers.map(customer => (
      <StyledTableRow key={customer._id}>
        <StyledTableCell component="th" scope="row">{customer.name}</StyledTableCell>
        <StyledTableCell >{customer.address}</StyledTableCell>
        <StyledTableCell >{customer.phone}</StyledTableCell>
      </StyledTableRow>
    ))


     if(isLoading)  {
       return <Spinner />
     }

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell >Customer Name</StyledTableCell>
              <StyledTableCell >Customer Address</StyledTableCell>
              <StyledTableCell >Customer Phone Number</StyledTableCell>
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
    customers: getCustomersState(state),
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getCustomers
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Customers));