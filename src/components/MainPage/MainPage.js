import React from 'react';
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

function createData(invoiceId, customerName, discount, total, actions) {
  return { invoiceId, customerName, discount, total, actions };
}

const rows = [
  createData('123', "Name Surname", 10, 24, <Button variant="contained" color="secondary"> View </Button>),
  createData('456', "Name Surname", 9.0, 37, <Button variant="contained" color="secondary"> View </Button>),
  createData('789', "Name Surname", 16.0, 24, <Button variant="contained" color="secondary"> View </Button>),

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

export default function MainPage() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell >Invoiсe ID</StyledTableCell>
            <StyledTableCell >Customer Name</StyledTableCell>
            <StyledTableCell >Discount (%)</StyledTableCell>
            <StyledTableCell >Total</StyledTableCell>
            <StyledTableCell >Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.invoiceId}>
              <StyledTableCell component="th" scope="row">{row.invoiceId}</StyledTableCell>
              <StyledTableCell >{row.customerName}</StyledTableCell>
              <StyledTableCell >{row.discount}</StyledTableCell>
              <StyledTableCell >{row.total}</StyledTableCell>
              <StyledTableCell >{row.actions}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}