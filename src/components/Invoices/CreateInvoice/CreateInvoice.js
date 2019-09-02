import React, { Component } from 'react';

import { withStyles} from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

import Spinner from '../../UI/Spinner/Spinner'

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { getInvoices, postInvoice, postInvoiceItems } from "../../../store/invoices/actions";

import Form from './CreateForm';

import { getCustomersArray } from '../../../store/customers/selectors';
import { getProductsArray } from '../../../store/products/selectors';

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



class CreateInvoice extends Component {



  render() {
    const {classes, myForm, isProductsLoading, isCustomersLoading, customers, products, getInvoices, postInvoice, postInvoiceItems } = this.props;

    if (isProductsLoading && isCustomersLoading) {
      return <Spinner />
    }

    return (
      <Paper className={classes.wrapper}>
        <Form
          total={this.props.total}
          customers={customers}
          products={products}
          myForm={myForm}
          postInvoice={postInvoice}
          postInvoiceItems={postInvoiceItems}
          getInvoices={getInvoices}/>
      </Paper>
    )
  }
}

const mapStateToProps =  state => {
  const { CreateForm } = state.form
  const discount = CreateForm && (CreateForm.values.discount || 0)
  const totalReduceCb = (acc, cur) =>
    acc + (((cur.productName && cur.productName.price) || 0) * (cur.quantity || 1))
  const totalWithoutDiscount = CreateForm ? CreateForm.values.items.reduce(totalReduceCb, 0) : 0
  const discountIn$ = (discount * totalWithoutDiscount) / 100
  const total = totalWithoutDiscount - discountIn$

  return {
    products: getProductsArray(state),
    customers: getCustomersArray(state),
    total,
    myForm: CreateForm
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getInvoices,
    postInvoice,
    postInvoiceItems
  }, dispatch);



export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CreateInvoice));