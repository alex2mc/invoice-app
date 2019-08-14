import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import MenuItem from "@material-ui/core/MenuItem";

import ColorButtonGreen from "../../UI/Buttons/ColorButtonGreen";

import asyncValidate from './asyncValidate'
import validate from './validate'




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
                             ...custom
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



class CreateForm extends Component {
  state = {
    customerName: {},
    productName: {},
    discount: 0,
    quantity: 0,
    total: ''
  };

  handleChange = e => {
    const {name, value} = e.target
    this.setState(state => {
      return {
        ...state,
        [name]: value
      }
    }, makeAfterSetState)

    function makeAfterSetState() {
      const invoiceSubtotal = this.state.quantity * this.state.productName.price;

      const invoiceDiscount = (this.state.discount * invoiceSubtotal) / 100;
      const invoiceTotal = invoiceSubtotal - invoiceDiscount;

      this.setState(state => {
        return  {
          ...state,
          total: invoiceTotal.toFixed(2)
        }
      })}
  };

  handleSavingInvoice = async () => {
    this.props.handleSubmit()
    this.props.postInvoice({customer_id: this.state.customerName.id, discount: +this.state.discount, total: +this.state.total})
    // await this.props.fetchInvoices()
    // this.props.history.push("/invoices")

  };


 render () {
   const {handleSubmit, pristine, submitting, classes, customers, products, invalid} = this.props;
   console.log(this.props)
   return (
     <form onSubmit={this.handleSavingInvoice}>

       {/*CUSTOMER NAME*/}
       <div>
         <Field
           classes={classes}
           name="customerName"
           value={this.state.customerName}
           component={renderSelectFieldCustomer}
           onChange={this.handleChange}
           label="Select Name"
         >
           {
             customers
               ? customers.map(customer => (
                 <MenuItem key={customer.id} value={customer}>{customer.name}</MenuItem>
               ))
               : null
           }
         </Field>
       </div>

       {/*PRODUCT NAME*/}
       <div>
         <Field
           classes={classes}
           name="productName"
           value={this.state.productName}
           component={renderSelectFieldProduct}
           onChange={this.handleChange}
           label="Add Product"
         >
           {
             products
               ? products.map(product => (
                 <MenuItem key={product.id} value={product}>{product.name}</MenuItem>
               ))
               : null
           }
         </Field>
       </div>


       {/*QUANTITY*/}
       <div>
         <Field
           name="quantity"
           component={renderTextField}
           label="0"
           type='number'
           onChange={this.handleChange}
           value={this.state.quantity}
           inputProps={{
             step: 1, // 5 min
           }}
         />
       </div>

       {/*DISCOUNT*/}
       <div>
         <Field
           name="discount"
           component={renderTextField}
           label="0"
           type='number'
           onChange={this.handleChange}
           value={this.state.discount}
           inputProps={{
             step: 1, // 5 min
           }}
         />
       </div>

       {/*BUTTON*/}
       <div>
         <ColorButtonGreen type="submit" disabled={invalid || submitting || pristine} onClick={this.handleSavingInvoice}>
           Submit
         </ColorButtonGreen>
       </div>
     </form>
   )
 }
};

export default reduxForm({
  form: 'CreateForm', // a unique identifier for this form
  validate,
  asyncValidate
})(CreateForm)