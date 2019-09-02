import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
// import Form from './CreateForm';
import {InvoiceForm} from '../forms/InvoiceForm';

import Paper from '@material-ui/core/Paper';

import { getInvoices, postInvoice, postInvoiceItems } from "../../../store/invoices/actions";
import { getProductsArray } from '../../../store/products/selectors';

import { styles } from '../shared/styles';



class CreateInvoice extends Component {



  render() {
    const {
      // myForm,
      products,
      getInvoices,
      postInvoice,
      postInvoiceItems,
      total
    } = this.props;

    return (
      <Paper style={styles.wrapper}>
        <InvoiceForm
          total={total}
          products={products}
          // myForm={myForm}
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



export default connect(mapStateToProps, mapDispatchToProps)(CreateInvoice);