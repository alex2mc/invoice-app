import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: theme.spacing(2),
  },
  root: {
    width: '75%',
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(2),
    overflowX: 'auto',
  },
  rootRight: {
    width: '25%',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(6),
    overflowX: 'auto',
  },
  tableHeader: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  table: {
    minWidth: 500,
  },
}));

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Paperclips (Box)', 1, 2),
  createRow('Paper (Case)', 10, 3),
  createRow('Waste Basket', 2, 2),
];

const Discount = 15;

const invoiceSubtotal = subtotal(rows);
const invoiceDiscount = (Discount * invoiceSubtotal) / 100;
const invoiceTotal = invoiceSubtotal - invoiceDiscount;

export default function SpanningTable() {
  const classes = useStyles();

  return (
    <Paper className={classes.wrapper}>
      <Typography variant="subtitle2" gutterBottom className={classes.tableHeader}>Invoice id</Typography>
      <Typography variant="h6" gutterBottom className={classes.tableHeader}>Name Surname</Typography>
    <div style={{display: "flex"}}>
      <Paper className={classes.root}>

        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Products</TableCell>
              <TableCell align="right">Q-ty</TableCell>
              <TableCell align="right">Price ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.desc}>
                <TableCell>{row.desc}</TableCell>
                <TableCell align="right">{row.qty}</TableCell>
                <TableCell align="right">{ccyFormat(row.price)}</TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell  />
              <TableCell colSpan={1}>Total</TableCell>
              <TableCell align="right" >{ccyFormat(invoiceTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>

      <Paper className={classes.rootRight}>
        <Typography variant="h6" align="center" gutterBottom className={classes.tableHeader}>Discount (%)</Typography>
        <Typography variant="h4" align="center" gutterBottom className={classes.tableHeader}>15</Typography>
      </Paper>
    </div>
    </Paper>
  );
}