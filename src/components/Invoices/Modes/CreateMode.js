import React, { Component } from 'react';

import { withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';
// import TextField from '@material-ui/core/TextField';
import MenuItem from "@material-ui/core/MenuItem";

import ColorButtonGreen from '../../UI/Buttons/ColorButtonGreen'
import Spinner from '../../UI/Spinner/Spinner'

import { reduxForm, Field } from 'redux-form'
// import { SelectField, TextField} from 'redux-form-material-ui'
import { Select, TextField } from 'redux-form-material-ui'
// import Select from 'redux-form-material-ui/lib/Select';

import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import {fetchInvoices, postInvoice} from "../../../store/actions/invoices";



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

// const required = value => (value == null ? 'Required' : undefined);
// const email = value =>
//   (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
//     ? 'Invalid email'
//     : undefined);
// const tooBigDiscount = value => (value > 50 && value < 0 ? 'Discount is only from 0 to 50' : undefined);



class InvoiceCreateMode extends Component {
  state = {
    choosenCustomer: '',
    choosenProduct: '',
    discount: 0,
    quantity: 1,
    total: ''
  }

  handleChange = e => {
    const {name, value} = e.target
    this.setState(state => {
      return {
        ...state,
        [name]: value
      }
    }, makeAfterSetState)

    function makeAfterSetState() {
    const invoiceSubtotal = this.state.quantity * this.state.choosenProduct.price;

    const invoiceDiscount = (this.state.discount * invoiceSubtotal) / 100;
    const invoiceTotal = invoiceSubtotal - invoiceDiscount;

    this.setState(state => {
      return  {
        ...state,
      total: invoiceTotal.toFixed(2)
    }
    })}
  }

  handleSavingInvoice = async () => {
     this.props.postInvoice({customer_id: this.state.choosenCustomer.id, discount: +this.state.discount, total: +this.state.total})
     await this.props.fetchInvoices()
    this.props.history.push("/invoices")
    
  }



  render() {
    const {classes, isProductsLoading, isCustomersLoading, customers, products} = this.props;
    // console.log(this.props)
    // console.log(this.state)

    if (isProductsLoading && isCustomersLoading) {
      return <Spinner />
    }

    return (
      <Paper className={classes.wrapper}>
        <Typography variant="subtitle2" gutterBottom className={classes.tableHeader}>Invoice id</Typography>

        <form>

        <div className={classes.rootForm}>
          {/*<FormControl className={classes.formControl}>*/}
            {/*<InputLabel htmlFor="customer-name">Select Name</InputLabel>*/}
            <Field
              name="customerName"
              // value={this.state.choosenCustomer}
              component={Select}
              // onChange={this.handleChange}
              hintText="Select Name"
              // inputProps={{
              //   name: 'choosenCustomer',
              //   id: 'customer-name',
              // }}
            >
              {
                customers
                  ? customers.map(customer => (
                    <MenuItem key={customer.id} value={customer.name} primaryText={customer.name}/>
                    // <MenuItem key={customer.id} value={customer} >{customer.name}</MenuItem>

                  ))
                  : null
              }
            </Field>
          {/*</FormControl>*/}
        </div>

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

                    <div
                      className={classes.rootForm}
                      // autoComplete="off"
                    >
                      {/*<FormControl className={classes.formControl}>*/}
                        {/*<InputLabel htmlFor="product-name">Add Product</InputLabel>*/}
                        <Field
                          // value={this.state.choosenProduct}
                          name="product-name"
                          component={Select}
                          hintText="Add Product"
                          // onChange={this.handleChange}
                          // inputProps={{
                          //   name: 'choosenProduct',
                          //   id: 'product-name',
                          // }}
                        >
                          {
                            products
                              ? products.map(product => (
                                <MenuItem key={product.id} value={product.name} primaryText={product.name} />
                              ))
                              : null
                          }
                        </Field>
                      {/*</FormControl>*/}

                    </div>

                  </TableCell>
                  <TableCell align="right">
                    <div
                      className={classes.container}
                      // noValidate
                    >
                      <Field
                        // id="quantity"
                        // type="number"
                        name="quantity"
                        component={TextField}
                        hintText="1"
                        // value={this.state.quantity}
                        // onChange={this.handleChange}
                        // className={classes.textField}
                        // InputLabelProps={{
                        //   shrink: true,
                        // }}
                        // inputProps={{
                        //   step: 1, // 5 min
                        // }}
                      />
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    {this.state.choosenProduct.price}
                  </TableCell>
                </TableRow>


                <TableRow>
                  <TableCell/>
                  <TableCell colSpan={1}>Total</TableCell>
                  <TableCell align="right">{this.state.total}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <ColorButtonGreen variant="contained" color="secondary" className={classes.button} onClick={this.handleSavingInvoice}>
              Save Invoice
            </ColorButtonGreen>

          </Paper>


          <Paper className={classes.rootRight}>
            <Typography variant="h6" align="center" gutterBottom className={classes.tableHeader}>Discount (%)</Typography>
            <Typography variant="h4" align="center" gutterBottom className={classes.tableHeader}>
              <div className={classes.container}>
                <Field
                  // id="discount"
                  // type="number"
                  name="discount"
                  component={TextField}
                  // value={this.state.discount}
                  // className={classes.textField}
                  // onChange={this.handleChange}
                  // InputLabelProps={{
                  //   shrink: true,
                  // }}
                  // inputProps={{
                  //   step: 1, // 5 min
                  // }}
                />
              </div>
            </Typography>
          </Paper>
        </div>

        </form>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    postInvoice,
    fetchInvoices
  }, dispatch);

InvoiceCreateMode = reduxForm({
  form: 'createInvoice'
})(InvoiceCreateMode);


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(InvoiceCreateMode));