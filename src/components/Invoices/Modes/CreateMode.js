import React, { Component } from 'react';

import { withStyles} from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Spinner from '../../UI/Spinner/Spinner'

import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import { getInvoices, postInvoice, postInvoiceItems } from "../../../store/invoices/actions";

import Form from './CreateForm';



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



class InvoiceCreateMode extends Component {



  render() {
    const {classes, isProductsLoading, isCustomersLoading, customers, products, getInvoices, postInvoice, postInvoiceItems } = this.props;
    console.log('this.props.total', this.props.total)
    // console.log(this.state)

    if (isProductsLoading && isCustomersLoading) {
      return <Spinner />
    }

    return (
      <Paper className={classes.wrapper}>
        <Typography variant="subtitle2" gutterBottom className={classes.tableHeader}>Invoice id</Typography>

        <Form
          total={this.props.total}
          customers={customers}
          products={products}
          postInvoice={postInvoice}
          postInvoiceItems={postInvoiceItems}
          getInvoices={getInvoices}/>
      </Paper>
    )
  }
}

const mapStateToProps =  state => {
  const discount = state.form.CreateForm && (state.form.CreateForm.values.discount || 0)
  const totalReduceCb = (acc, cur) =>
    acc + (((cur.productName && cur.productName.price) || 0) * (cur.quantity || 1))
  const totalWithoutDiscount = state.form.CreateForm ? state.form.CreateForm.values.items.reduce(totalReduceCb, 0) : 0
  const discountIn$ = (discount * totalWithoutDiscount) / 100
  const total = totalWithoutDiscount - discountIn$

  return {
    products: state.products.products,
    isProductsLoading: state.products.isLoading,
    customers: state.customers.customers,
    isCustomersLoading: state.customers.isLoading,
    total,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getInvoices,
    postInvoice,
    postInvoiceItems
  }, dispatch);



export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(InvoiceCreateMode));