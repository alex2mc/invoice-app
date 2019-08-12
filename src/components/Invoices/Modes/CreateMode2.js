import React, { Component } from 'react';

import { withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from "@material-ui/core/MenuItem";

import ColorButtonGreen from '../../UI/Buttons/Button'
import Spinner from '../../UI/Spinner/Spinner'

import { connect } from 'react-redux';



const styles = theme => ({
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

});

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




class InvoiceCreateMode extends Component {
  state = {
    customerName: '',
    choosenProduct: '',
    discount: 0,
    quantity: 1,
  }

  handleChange = e => {
    const {name, value} = e.target
    this.setState(state => {
      return {
        ...state,
        [name]: value
      }
    })
  }



  render() {
    const {classes, isProductsLoading, isCustomersLoading, customers, products} = this.props;

    // console.log(this.props)
    console.log(this.state)

    if (isProductsLoading && isCustomersLoading) {
      return <Spinner />
    }

    return (
      <Paper className={classes.wrapper}>
        <Typography variant="subtitle2" gutterBottom className={classes.tableHeader}>Invoice id</Typography>

        <form
          className={classes.rootForm}
          autoComplete="off">
          <FormControl
            className={classes.formControl}
          >
            <InputLabel htmlFor="customer-name">Select Name</InputLabel>
            <Select
              value={this.state.customerName}
              onChange={this.handleChange}
              inputProps={{
                name: 'customerName',
                id: 'customer-name',
              }}
            >
              {
                customers
                  ? customers.map(customer => (
                    <MenuItem key={customer.id} value={customer.name}>{customer.name}</MenuItem>

                  ))
                  : null
              }
            </Select>
          </FormControl>
        </form>

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

                <TableRow>
                  <TableCell>

                    <form
                      className={classes.rootForm}
                      autoComplete="off">
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="product-name">Add Product</InputLabel>
                        <Select
                          value={this.state.choosenProduct}
                          onChange={this.handleChange}
                          inputProps={{
                            name: 'choosenProduct',
                            id: 'product-name',
                          }}
                        >
                          {
                            products
                              ? products.map(product => (
                                <MenuItem id={product.id} key={product.id} value={product} >{product.name}</MenuItem>
                              ))
                              : null
                          }
                        </Select>
                      </FormControl>

                    </form>

                  </TableCell>
                  <TableCell align="right">
                    <form
                      className={classes.container}
                      noValidate>
                      <TextField
                        id="quantity"
                        type="number"
                        name="quantity"
                        value={this.state.quantity}
                        onChange={this.handleChange}
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
                    {this.state.choosenProduct.price}
                  </TableCell>
                </TableRow>


                <TableRow>
                  <TableCell/>
                  <TableCell colSpan={1}>Total</TableCell>
                  <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <ColorButtonGreen variant="contained" color="secondary" className={classes.button}>
              Save Invoice
            </ColorButtonGreen>

          </Paper>


          <Paper className={classes.rootRight}>
            <Typography variant="h6" align="center" gutterBottom className={classes.tableHeader}>Discount (%)</Typography>
            <Typography variant="h4" align="center" gutterBottom className={classes.tableHeader}>
              <form className={classes.container} noValidate>
                <TextField
                  id="discount"
                  type="number"
                  name="discount"
                  value={this.state.discount}
                  className={classes.textField}
                  onChange={this.handleChange}
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
    )
  }
}

const mapStateToProps =  state => {
  return {
    products: state.product.products,
    isProductsLoading: state.product.isLoading,
    customers: state.customer.customers,
    isCustomersLoading: state.customer.isLoading
  }
}



export default withStyles(styles)(connect(mapStateToProps)(InvoiceCreateMode));