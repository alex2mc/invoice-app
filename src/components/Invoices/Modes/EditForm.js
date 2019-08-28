import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import MenuItem from "@material-ui/core/MenuItem";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography";

import ColorButtonGreen from "../../UI/Buttons/ColorButtonGreen";
import Spinner from '../../UI/Spinner/Spinner';

import validate from './validate'

import {withStyles} from "@material-ui/core";

import { withRouter } from 'react-router-dom';

// import { getCustomer } from "../../../store/customers/selectors";
import { connect } from 'react-redux';




const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  numberFormControl: {
    maxWidth: 75,
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    overflowX: 'auto',
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  tableHeader: {
    // paddingTop: theme.spacing(1),
    // paddingLeft: theme.spacing(2),
    // marginBottom: theme.spacing(2),
  },
});


const renderTextField = ({
                           label,
                           input,
                           meta: { touched, invalid, error },
                           ...custom
                         }) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}

  />
);


const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
};

const renderSelectFieldCustomer = ({
                                     input,
                                     label,
                                     meta: { touched, error },
                                     children,
                                     ...custom,

                                   }) => (
  <FormControl error={touched && error}>
    <InputLabel htmlFor="customer-name">Select Name</InputLabel>
    <Select
      {...input}
      {...custom}
      inputProps={{
        name: 'customerName',
        id: 'customer-name'
      }}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
);

const renderSelectFieldProduct = ({
                                    input,
                                    label,
                                    meta: { touched, error },
                                    children,
                                    ...custom
                                  }) => (
  <FormControl error={touched && error}>
    <InputLabel htmlFor="product-name">Add Product</InputLabel>
    <Select
      {...input}
      {...custom}
      inputProps={{
        name: 'productName',
        id: 'product-name'
      }}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
);



class EditForm extends Component {
  state = {
    customerName: null,
    productName: null,
    productPrice: null,
    discount: null,
    quantity: null,
    total: ''
  };

  componentDidUpdate(prevProps, prevState) {
    const { customer,  invoiceItems, products, invoice} = this.props;
    if(!invoice || !products) {
      return {};
    }

    const product_name = invoiceItems.map(invoiceItem => (
      (products.find(product => invoiceItem.product_id === product._id) || {name: 'kill me'}).name));
    //
    // const product_price = invoiceItems.map(invoiceItem => (
    //   products.find(product => invoiceItem.product_id === product._id).price));

    const chosenProduct = invoiceItems.map(invoiceItem => (
      products.find(product => invoiceItem.product_id === product._id)));



    // console.log(4444, customer);
    console.log(chosenProduct.name);
    this.props.initialize({
      discount: invoice.invoice.discount ? invoice.invoice.discount : 0,
      quantity: invoiceItems.map(inv => inv.quantity),
      customerName: customer && customer.customer ? customer.customer.name : 'kill me',
      productName: product_name
    },
      // [{keepDirty: false, keepSubmitSucceeded: false, updateUnregisteredFields: false, keepValues: false}]
    );

    // this.setState(state => {
    //
    //
    //   return {
    //     ...state,
    //     customerName: customer.customer.name,
    //     productName: chosenProduct.name ? chosenProduct.name : product_name,
    //     productPrice: chosenProduct.price ? chosenProduct.price : product_price,
    //     discount: invoice.invoice.discount ? invoice.invoice.discount : 0,
    //     quantity: invoiceItems.map(inv => inv.quantity),
    //   }
    // })
  }

  // componentWillReceiveProps(nextProps, nextContext) {
  //   const {
  //     invoicesList,
  //     invoices,
  //     customers,
  //     products
  //   } = this.props;
  //
  //
  //   this.setState(state => {
  //     // const neededList = invoicesList &&
  //     //   invoicesList.find(invoiceList => this.props.match.params.invoiceId === invoiceList.invoice_id);
  //
  //     const neededInvoice = invoices &&
  //       invoices.find(invoice => this.props.match.params.invoiceId === invoice.id);
  //
  //
  //     const neededCustomer = customers && neededInvoice
  //       ? customers.find(customer => neededInvoice.customer === customer.id)
  //       : null;
  //
  //     const neededProducts = products && invoicesList &&
  //       products.filter(products => invoicesList.find(inv => inv.product_id === products.id));
  //
  //
  //     return {
  //       ...state,
  //       customerName: neededCustomer,
  //       productName: neededProducts,
  //       discount: neededInvoice,
  //       // quantity: 0,
  //       // total: ''
  //     }
  //   })
  //
  // }

  handleChange = e => {
    const {name, value} = e.target;
    this.setState(state => {
      return {
        ...state,
        [name]: value
      }
    },
      makeAfterSetState
    );

    function makeAfterSetState() {
      const invoiceSubtotal = +this.state.quantity * +this.state.productPrice;

      const invoiceDiscount = (this.state.discount * invoiceSubtotal) / 100;
      const invoiceTotal = invoiceSubtotal - invoiceDiscount;

      this.setState(state => {
        return  {
          ...state,
          total: invoiceTotal.toFixed(2)
        }
      })}
  };

  handleSavingInvoice =  (e) => {
    e.preventDefault();
    this.props.updateInvoice({
      invoice_id: this.props.match.params.invoiceId,
      customer_id: this.state.customerName.id,
      discount: +this.state.discount,
      total: +this.state.total})

  };


  render () {
    const {
      pristine,
      submitting,
      classes,
      customer,
      customers,
      products,
      invalid
    } = this.props;

    // console.log(5555, customer);

    if(!customer || customer.name ) {
      return <Spinner />
    }

    return (
      <form onSubmit={this.handleSavingInvoice}>

        <Typography variant="subtitle2" gutterBottom className={classes.tableHeader}>
          <p>Invoice ID:</p>
          {this.props.match.params.invoiceId}
        </Typography>
        <Divider />

        {/*CUSTOMER NAME*/}
        {/*<p>{customer.customer.name} </p>*/}
        <div >
          <Field
            className={classes.formControl}
            name="customerName"
            // value={this.state.customerName}

            component={renderSelectFieldCustomer}
            onChange={this.handleChange}
            label="Select Name"
          >
            {
              customers
                ? customers.map(customer => (
                  <MenuItem key={customer._id} name="customerName2" value={customer.name}>{customer.name}</MenuItem>
                ))
                : null
            }
          </Field>
        </div>

        <div style={{display: "flex"}}>

          <Paper className={classes.root}>

            <List>
              <ListItem>
                <ListItemText>Products</ListItemText>
                <ListItemText >Q-ty</ListItemText>
                <ListItemText >Price ($)</ListItemText>
              </ListItem>
              <Divider />

              <ListItem>
                <ListItemText>
                  {/*PRODUCT NAME*/}
                  <div>
                    <Field
                      className={classes.formControl}
                      name="productName"
                      // value={this.state.productName.name}
                      component={renderSelectFieldProduct}
                      onChange={this.handleChange}
                      label="Add Product"
                    >
                      {
                        products
                          ? products.map(product => (
                            <MenuItem key={product._id} name="productName2" value={product.name}>{product.name}</MenuItem>
                          ))
                          : null
                      }
                    </Field>
                  </div>
                </ListItemText>

                <ListItemText >
                  {/*QUANTITY*/}
                  <div>
                    <Field
                      name="quantity"
                      className={classes.numberFormControl}
                      component={renderTextField}
                      // label="0"
                      type='number'
                      onChange={this.handleChange}
                      value={this.state.quantity}
                      inputProps={{
                        step: 1, // 5 min
                      }}
                    />
                  </div>
                </ListItemText>

                <ListItemText >
                  {/*{this.state.productName.price}*/}
                  {this.state.productPrice}
                </ListItemText>
              </ListItem>
              <Divider />

              <ListItem>
                <ListItemText >Total</ListItemText>
                <ListItemText >
                  {this.state.total}
                </ListItemText>
              </ListItem>
            </List>

          </Paper>

          <Paper className={classes.rootRight}>
            <Typography variant="h6" align="center" gutterBottom className={classes.tableHeader}>Discount (%)</Typography>
            {/*DISCOUNT*/}
            <div>
              <Field
                name="discount"
                className={classes.numberFormControl}
                component={renderTextField}
                // label="0"
                type='number'
                onChange={this.handleChange}
                value={this.state.discount}
                inputProps={{
                  step: 1, // 5 min
                }}
              />
            </div>

          </Paper>

        </div>

        {/*BUTTON*/}
        <div className={classes.button}>
          <ColorButtonGreen type="submit" disabled={invalid || submitting || pristine} onClick={this.handleSavingInvoice}>
            save changes
          </ColorButtonGreen>
        </div>
      </form>
    )
  }
};

const mapStateToProps =  state => {
  return {
    // customer: getCustomer(state),
  }
};

export default reduxForm({
  form: 'EditForm', // a unique identifier for this form
  validate,
  enableReinitialize : true,
  keepDirtyOnReinitialize : true
})(withStyles(styles)(withRouter(connect(mapStateToProps)(EditForm))))