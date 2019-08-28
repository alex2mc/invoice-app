import React, { Component } from 'react';

import { withStyles} from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

import Spinner from '../../UI/Spinner/Spinner'

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { getInvoice, getInvoiceItems, updateInvoice } from "../../../store/invoices/actions";

import EditForm from './EditForm';

// import {getCustomer, getCustomersState,} from '../../../store/customers/selectors';
// import { getInvoiceState, getInvoiceItemsState } from '../../../store/invoices/selectors';
import { getProductsState } from '../../../store/products/selectors';


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



class InvoiceCreateMode extends Component {
  componentWillMount() {
    // const { customer, invoiceItems } = this.props;
    this.props.getInvoiceItems(this.props.match.params.invoiceId);
    this.props.getInvoice(this.props.match.params.invoiceId);
    // console.log(customer.customer._id );
    // this.props.initialize({discount: 10, quantity: 25, customerName: customer && customer.customer._id ? customer.customer._id : 'oooooo' })
  }


  render() {
    const {classes,
      isProductsLoading,
      isCustomersLoading,
      customers,
      customer,
      products,
      postInvoice,
      invoiceItems,
      invoice,
      getInvoice,
      getInvoiceItems,
      updateInvoice
    } = this.props;
    // console.log(this.props)
    // console.log(this.state)

    if (isProductsLoading && isCustomersLoading) {
      return <Spinner />
    }

    return (
      <Paper className={classes.wrapper}>

        {/*{customer ?*/}
          <EditForm
          customers={customers}
          customer={customer}
          products={products}
          postInvoice={postInvoice}
          invoiceItems={invoiceItems}
          invoice={invoice}
          getInvoice={getInvoice}
          getInvoiceItems={getInvoiceItems}
          updateInvoice={updateInvoice}
        />
        {/*:null}*/}
      </Paper>
    )
  }
}

const mapStateToProps =  state => {
  return {
    products: getProductsState(state),
    // customer: getCustomer(state),
    // customers: getCustomersState(state),
    // invoiceItems: getInvoiceItemsState(state),
    // invoice: getInvoiceState(state)
  }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getInvoice,
    getInvoiceItems,
    updateInvoice
  }, dispatch);



export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(InvoiceCreateMode));