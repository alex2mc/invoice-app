import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';




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

 function createData(customerName, customerAddress, customerPhone ) {
  return { customerName, customerAddress, customerPhone };
}

 const rows = [
  createData('Mickle Scott', 'Pencilvania', '+380930000000'),
  createData('Dwight', 'Pencilvania', '+380930000000'),
  createData('Creed', 'Pencilvania', '+380930000000'),
 ];

 const useStyles = makeStyles(theme => ({
  root: {
    width: '70%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 500,
  },
}));

 export default function Customers() {
  const classes = useStyles();

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
          {rows.map(row => (
            <StyledTableRow key={row.customerName}>
              <StyledTableCell component="th" scope="row">{row.customerName}</StyledTableCell>
              <StyledTableCell >{row.customerAddress}</StyledTableCell>
              <StyledTableCell >{row.customerPhone}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
} 