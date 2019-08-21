import React, { Component } from 'react';

import { withStyles} from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

import Spinner from '../../UI/Spinner/Spinner'

import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import { getInvoice, getInvoiceItems } from "../../../store/invoices/actions";

import EditForm from './EditForm';

import { getCustomersState } from '../../../store/customers/selectors';



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
    const {classes,
      isProductsLoading,
      isCustomersLoading,
      customers,
      customer,
      products,
      postInvoice,
      invoicesList,
      invoices,
      getInvoice,
      getInvoiceItems
    } = this.props;
    // console.log(this.props)
    // console.log(this.state)

    if (isProductsLoading && isCustomersLoading) {
      return <Spinner />
    }

    return (
      <Paper className={classes.wrapper}>

        <EditForm
          customers={customers}
          customer={customer}
          products={products}
          postInvoice={postInvoice}
          invoicesList={invoicesList}
          invoices={invoices}
          getInvoice={getInvoice}
          getInvoiceItems={getInvoiceItems}
          // initialValues={{customer}}
        />
      </Paper>
    )
  }
}

const mapStateToProps =  state => {
  return {
    products: state.products.products,
    isProductsLoading: state.products.isLoading,
    customer: state.customers.customer,
    customers: getCustomersState(state),
    isCustomersLoading: state.customers.isLoading,
    invoicesList: state.invoices.invoicesList,
    invoices: state.invoices.invoices
  }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getInvoice,
    getInvoiceItems
  }, dispatch);



export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(InvoiceCreateMode));