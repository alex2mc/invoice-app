import React, { Component } from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';



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

function createData(invoiceId, customerName, discount, total, action1, action2, action3) {
  return { invoiceId, customerName, discount, total, action1, action2, action3 };
}

const rows = [
  createData('123', "Name Surname", 10, 24, <Button variant="contained" color="secondary"> View </Button>,  <Button variant="contained" color="secondary"> Edit </Button>, <Button variant="contained" color="secondary"> Delete </Button>),

];

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

  render() {
    // const classes = useStyles();

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
              <StyledTableCell>Actions</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <StyledTableRow key={row.invoiceId}>
                <StyledTableCell component="th" scope="row">{row.invoiceId}</StyledTableCell>
                <StyledTableCell>{row.customerName}</StyledTableCell>
                <StyledTableCell>{row.discount}</StyledTableCell>
                <StyledTableCell>{row.total}</StyledTableCell>
                <StyledTableCell>{row.action1}</StyledTableCell>
                <StyledTableCell>{row.action2}</StyledTableCell>
                <StyledTableCell>{row.action3}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default Invoices;