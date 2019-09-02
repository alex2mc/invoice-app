import React, { Component } from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'

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

import validate from '../../../shared/validate'

import { withStyles } from "@material-ui/core";

import { withRouter } from 'react-router-dom';

// import { getCustomer } from "../../../store/customers/selectors";
import { connect } from 'react-redux';
import EditFields from "./EditFields";




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

  componentDidUpdate() {
    const {
      customersEntities,
      invoiceItems,
      productsEntities,
      invoices
    } = this.props;
    // console.log(invoiceItems);

    const neededInvoice = invoices[this.props.match.params.invoiceId];
    const neededCustomer = customersEntities[neededInvoice && neededInvoice.customer_id]
    // console.log('productsEntities', productsEntities);
    console.log(this.props)

    this.props.initialize({
        discount: neededInvoice && neededInvoice.discount,
        customerName: neededCustomer && neededCustomer.name,
        // productName: productsEntities && productsEntities[invIt.product_id] && productsEntities[invIt.product_id].name ? productsEntities[invIt.product_id].name : 'kill'
        items: invoiceItems,
      });
  }

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
      customers,
      products,
      invalid,
      invoices
    } = this.props;

    // console.log(this.props);


    const neededInvoice = invoices[this.props.match.params.invoiceId];

    if(!neededInvoice ) {
      return <Spinner />
    }

    return (
      <form onSubmit={this.handleSavingInvoice}>

        <div >
          <Field
            className={classes.formControl}
            name="customerName"
            component={renderSelectFieldCustomer}
            label="Select Name"
          >
            {
              customers
                ? customers.map(customer => (
                  <MenuItem key={customer._id} name="customerName" value={customer.name}>{customer.name}</MenuItem>
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

              {/*<ListItem>*/}
              {/*  <ListItemText>*/}
              {/*    /!*PRODUCT NAME*!/*/}
              {/*    <div>*/}
              {/*      <Field*/}
              {/*        className={classes.formControl}*/}
              {/*        name="productName"*/}
              {/*        component={renderSelectFieldProduct}*/}
              {/*        label="Add Product"*/}
              {/*      >*/}
              {/*        {*/}
              {/*          products*/}
              {/*            ? products.map(product => (*/}
              {/*              <MenuItem key={product._id} name="productName2" value={product.name}>{product.name}</MenuItem>*/}
              {/*            ))*/}
              {/*            : null*/}
              {/*        }*/}
              {/*      </Field>*/}
              {/*    </div>*/}
              {/*  </ListItemText>*/}

              {/*  <ListItemText >*/}
              {/*    /!*QUANTITY*!/*/}
              {/*    <div>*/}
              {/*      <Field*/}
              {/*        name="quantity"*/}
              {/*        className={classes.numberFormControl}*/}
              {/*        component={renderTextField}*/}
              {/*        // label="0"*/}
              {/*        type='number'*/}
              {/*        inputProps={{*/}
              {/*          step: 1, // 5 min*/}
              {/*        }}*/}
              {/*      />*/}
              {/*    </div>*/}
              {/*  </ListItemText>*/}

              {/*  <ListItemText >*/}
              {/*    /!*{this.state.productPrice}*!/*/}
              {/*  </ListItemText>*/}
              {/*</ListItem>*/}
              <Divider />

              <FieldArray
                name="items"
                component={EditFields}
                renderSelectFieldProduct={renderSelectFieldProduct}
                renderTextField={renderTextField}
                classes={classes}
                products={products}
              />

              <ListItem>
                <ListItemText>Total</ListItemText>
                <ListItemText>
                  {/*{this.state.total}*/}
                </ListItemText>
              </ListItem>
            </List>

          </Paper>

          <Paper className={classes.rootRight}>
            <Typography variant="h6" align="center" gutterBottom className={classes.tableHeader}>Discount (%)</Typography>
            {/*DISCOUNT*/}
            <Typography variant="h4" align="center" gutterBottom className={classes.tableHeader}>
              {neededInvoice && neededInvoice.discount ? neededInvoice.discount : 0}
            </Typography>

          </Paper>

        </div>

        {/*BUTTON*/}
        <div className={classes.button}>
          <ColorButtonGreen
            type="submit"
            disabled={invalid || submitting || pristine}
            onClick={this.handleSavingInvoice}>
            save changes
          </ColorButtonGreen>
        </div>
      </form>
    )
  }
}

const mapStateToProps =  state => {
  return {
    // customer: getCustomer(state),
  }
};

export default reduxForm({
  form: 'EditForm', // a unique identifier for this form
  validate,
})(withStyles(styles)(withRouter(connect(mapStateToProps)(EditForm))))