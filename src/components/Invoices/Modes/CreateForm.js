import React, { Component } from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from "@material-ui/core/MenuItem";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core";

import ColorButtonGreen from "../../UI/Buttons/ColorButtonGreen";

import validate from './validate';

import { withRouter } from 'react-router-dom';
import CreateFields from "./CreateFields";


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
  }
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
    // customerName: '',
    // productName: '',
    // discount: 0,
    // quantity: 0,
    // sum: '',
    // total: ''
  };

  // handleChange = e => {
  //   const {name, value} = e.target;
  //   this.setState(state => {
  //     return {
  //       ...state,
  //       [name]: value
  //     }
  //   }, makeAfterSetState);
  //
  //   function makeAfterSetState() {
  //     const invoiceSum = this.state.quantity * this.state.productName.price;
  //
  //     const invoiceDiscount = (this.state.discount * invoiceSum) / 100;
  //     const invoiceTotal = invoiceSum - invoiceDiscount;
  //
  //     this.setState(state => {
  //       return  {
  //         ...state,
  //         sum: invoiceSum.toFixed(2),
  //         total: invoiceTotal.toFixed(2)
  //       }
  //     })}
  // };

  handleSavingInvoice = (e) => {
    e.preventDefault();

    const customer_id = this.props.myForm && this.props.myForm.values && this.props.myForm.values.customerName && this.props.myForm.values.customerName._id ? this.props.myForm.values.customerName._id : 'kill';
    const discount = this.props.myForm && this.props.myForm.values && this.props.myForm.values.discount ? +this.props.myForm.values.discount : 0;
    const total = this.props.total
    const items = this.props.myForm && this.props.myForm.values && this.props.myForm.values.items ? this.props.myForm.values.items : 'kill';



    const payload = {customer_id, discount, total, items}
    // console.log(payload);

    this.props.postInvoice(payload);

    this.props.history.push("/invoices")
  };


 render () {
   const {pristine, submitting, classes, customers, products, valid} = this.props;
   // console.log(this.props.myForm && this.props.myForm.values && this.props.myForm.values.items ? this.props.myForm.values.items : 'kill')
   return (
     <form onSubmit={this.handleSavingInvoice}>

       {/*CUSTOMER NAME*/}
       <div >
         <Field
           className={classes.formControl}
           name="customerName"
           value={this.state.customerName}
           component={renderSelectFieldCustomer}
           onChange={this.handleChange}
           label="Select Name"
         >
           {
             customers
               ? customers.map(customer => (
                 <MenuItem key={customer._id} value={customer}>{customer.name}</MenuItem>
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

          <FieldArray
            name="items"
            component={CreateFields}
            renderSelectFieldProduct={renderSelectFieldProduct}
            renderTextField={renderTextField}
            classes={classes}
            products={products}
            // handleChange={this.handleChange}
            discount={this.state.discount}
          />


         <ListItem>
           <ListItemText >Total</ListItemText>
           <ListItemText >
             {this.props.total || 0}
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
             // onChange={this.handleChange}
             // value={this.state.discount}
             inputProps={{
               min: 1,
               max: 50,
             }}
           />
         </div>

       </Paper>

       </div>

       {/*BUTTON*/}
       <div className={classes.button}>
         <ColorButtonGreen
           type="submit"
           disabled={!valid || submitting || pristine}
           onClick={this.handleSavingInvoice}>
           SAVE INVOICE
         </ColorButtonGreen>
       </div>
     </form>
   )
 }
}

export default reduxForm({
  form: 'CreateForm', // a unique identifier for this form
  validate,
})((withStyles(styles)(withRouter(CreateForm))))