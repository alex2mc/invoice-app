import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import EditForm from './EditForm';

import { withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// import Spinner from '../../UI/Spinner/Spinner'

import {
  getInvoice,
  getInvoiceItems
} from "../../../store/invoices/actions";
import { getEntities as getCustomers, getCustomersArray } from '../../../store/customers/selectors';
import { getEntities as getProducts, getProductsArray } from '../../../store/products/selectors';
import { getEntities as getInvoices, getInvoiceItemsArray } from "../../../store/invoices/selectors";


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



class EditInvoice extends Component {
  componentDidMount() {
    this.props.getInvoiceItems(this.props.match.params.invoiceId);
    this.props.getInvoice(this.props.match.params.invoiceId);
  }


  render() {
    const {
      classes,
      customersEntities,
      customers,
      productsEntities,
      products,
      invoiceItems,
      invoices,
      invoice,
      getInvoice,
      getInvoiceItems,
      updateInvoice,
      total,
      myForm
    } = this.props;

    // console.log(this.props)

    // if (isProductsLoading && isCustomersLoading) {
    //   return <Spinner />
    // }

    return (
      <Paper className={classes.wrapper}>
          <EditForm
          customersEntities={customersEntities}
          customers={customers}
          productsEntities={productsEntities}
          products={products}
          invoices={invoices}
          invoiceItems={invoiceItems}
          invoice={invoice}
          getInvoice={getInvoice}
          getInvoiceItems={getInvoiceItems}
          updateInvoice={updateInvoice}
          total={total}
          myForm={myForm}
        />
      </Paper>
    )
  }
}

const mapStateToProps =  state => {
  const { EditForm } = state.form
  const discount = EditForm && EditForm.values && (EditForm.values.discount || 0)
  const totalReduceCb = (acc, cur) =>
    acc + (((cur.productName && cur.productName.price) || 0) * (cur.quantity || 1))
  const totalWithoutDiscount = EditForm && EditForm.values && EditForm.values.items  ? EditForm.values.items.reduce(totalReduceCb, 0) : 0
  const discountIn$ = (discount * totalWithoutDiscount) / 100
  const total = totalWithoutDiscount - discountIn$

  return {
    productsEntities: getProducts(state),
    products: getProductsArray(state),
    customersEntities: getCustomers(state),
    customers: getCustomersArray(state),
    total,
    myForm: EditForm,
    invoices: getInvoices(state),
    invoiceItems: getInvoiceItemsArray(state)
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getInvoice,
    getInvoiceItems
  }, dispatch);



export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(EditInvoice));