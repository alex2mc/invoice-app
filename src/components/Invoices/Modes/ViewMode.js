import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from "redux";
import { getInvoiceItems, getInvoice } from "../../../store/invoices/actions";
import { connect } from "react-redux";

import { Link } from 'react-router-dom'
import Spinner from '../../UI/Spinner/Spinner'

import { getProductsState } from '../../../store/products/selectors';
import { getInvoiceState, getInvoiceItemsState } from '../../../store/invoices/selectors';
import { getCustomer } from '../../../store/customers/selectors';


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
  },
});



class ViewMode extends Component {

  componentDidMount() {
    this.props.getInvoiceItems(this.props.match.params.invoiceId);
    this.props.getInvoice(this.props.match.params.invoiceId);
  }


  render () {
    const {
      classes,
      customer, 
      invoice, 
      products,
      invoiceItems } = this.props;

    // console.log("invoiceItems", invoiceItems);
    // console.log(invoice);
    // console.log(customer );



    if(!invoice || !customer || !customer.customer || !products ) {
      return <Spinner />
    }

    return (
      <Paper className={classes.wrapper}>
        <Typography variant="subtitle2" gutterBottom className={classes.tableHeader}>
          {this.props.match.params.invoiceId}
        </Typography>
        <Link to="/customers">
          <Typography variant="h6" gutterBottom className={classes.tableHeader}>
            {customer.customer.name}
          </Typography>
        </Link>
        <div style={{display: "flex"}}>
          <Paper className={classes.root}>

            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Products</TableCell>
                  <TableCell align="right">Q-ty</TableCell>
                  <TableCell align="right">Price ($)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                
                {
                  invoiceItems.map(invoiceItem => (
                    <TableRow key={invoiceItem._id}>
                      <TableCell>
                        {products.find(product => invoiceItem.product_id === product._id).name}
                      </TableCell>
                      <TableCell align="right">
                        {invoiceItem.quantity}
                      </TableCell>
                      <TableCell align="right">
                        {products.find(product => invoiceItem.product_id === product._id).price}
                      </TableCell>
                    </TableRow>
                  ))
                  
                }

                <TableRow>
                  <TableCell/>
                  <TableCell colSpan={1}>Total</TableCell>
                  <TableCell align="right">
                    {invoice.invoice.total}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>

          <Paper className={classes.rootRight}>
            <Typography variant="h6" align="center" gutterBottom className={classes.tableHeader}>
              Discount (%)
            </Typography>
            <Typography variant="h4" align="center" gutterBottom className={classes.tableHeader}>
              {invoice.invoice.discount ? invoice.invoice.discount : 0}
            </Typography>
          </Paper>
        </div>
      </Paper>
    );
  }
}

const mapStateToProps =  state => {
  return {
    products: getProductsState(state),
    invoice: getInvoiceState(state),
    customer: getCustomer(state),
    invoiceItems: getInvoiceItemsState(state)
  }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getInvoiceItems,
    getInvoice
  }, dispatch);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ViewMode));