import React from 'react';

import {makeStyles, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';


import TextField from '@material-ui/core/TextField';
import Customers from "./Customers";
import Products from "./Products";



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
    // marginBottom: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
  rootForm: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  container: {
    // display: 'flex',
    // flexWrap: 'wrap',
  },
  textField: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    width: 50,
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




export default function InvoiceCreateMode() {
  const classes = useStyles();

  const ColorButtonGreen = withStyles(theme => ({
    root: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
  }))(Button);

  const [values, setValues] = React.useState({
    customerName: '',
    productName: ' ',
  });

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <Paper className={classes.wrapper}>
      <Typography variant="subtitle2" gutterBottom className={classes.tableHeader}>Invoice id</Typography>

            <Customers />

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

                <TableRow >
                  <TableCell>

                    <form className={classes.rootForm} autoComplete="off">
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="product-name">Add Product</InputLabel>
                        <Select
                          value={values.productName}
                          onChange={handleChange}
                          inputProps={{
                            name: 'productName',
                            id: 'product-name',
                          }}
                        >

                         <Products />
                          {/*<MenuItem value={`Name Surname 1`}>car</MenuItem>*/}
                          {/*<MenuItem value={`Name Surname 2`}>phone</MenuItem>*/}
                          {/*<MenuItem value={`Name Surname 3`}>water</MenuItem>*/}
                        </Select>
                      </FormControl>
                    </form>

                  </TableCell>
                  <TableCell align="right">
                    <form className={classes.container} noValidate>
                      <TextField
                        id="quantity"
                        type="number"
                        defaultValue="1"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 1, // 5 min
                        }}
                      />
                    </form>
                  </TableCell>
                  <TableCell align="right">
                    price
                    {/*{ccyFormat(row.price)}*/}
                  </TableCell>
                </TableRow>


              <TableRow>
                <TableCell  />
                <TableCell colSpan={1}>Total</TableCell>
                <TableCell align="right" >{ccyFormat(invoiceTotal)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <ColorButtonGreen variant="contained" color="secondary" className={classes.button}>Save Invoice</ColorButtonGreen>
        </Paper>



        <Paper className={classes.rootRight}>
          <Typography variant="h6" align="center" gutterBottom className={classes.tableHeader}>Discount (%)</Typography>
          <Typography variant="h4" align="center" gutterBottom className={classes.tableHeader}>
            <form className={classes.container} noValidate>
              <TextField
                id="discount"
                type="number"
                defaultValue="1"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 1, // 5 min
                }}
              />
            </form>
          </Typography>
        </Paper>
      </div>
    </Paper>
  );
}