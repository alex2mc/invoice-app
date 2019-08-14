import React, { Component } from 'react';

import { withStyles} from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Spinner from '../../UI/Spinner/Spinner'

import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import {fetchInvoices, postInvoice} from "../../../store/actions/invoices";

import Form from './Form';



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
    const {classes, isProductsLoading, isCustomersLoading, customers, products, postInvoice, fetchInvoices} = this.props;
    // console.log(this.props)
    // console.log(this.state)

    if (isProductsLoading && isCustomersLoading) {
      return <Spinner />
    }

    return (
      <Paper className={classes.wrapper}>
        <Typography variant="subtitle2" gutterBottom className={classes.tableHeader}>Invoice id</Typography>

        <Form customers={customers} products={products} postInvoice={postInvoice} fetchInvoices={fetchInvoices}/>
      </Paper>
    )
  }
}

const mapStateToProps =  state => {
  return {
    products: state.product.products,
    isProductsLoading: state.product.isLoading,
    customers: state.customer.customers,
    isCustomersLoading: state.customer.isLoading
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    postInvoice,
    fetchInvoices
  }, dispatch);



export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(InvoiceCreateMode));