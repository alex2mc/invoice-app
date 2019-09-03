import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { styles } from './styles';

import { bindActionCreators } from "redux";
import { getInvoiceItems, getInvoice } from "../../../store/invoices/actions";
import { connect } from "react-redux";

import { Link } from 'react-router-dom'
import Spinner from '../../UI/Spinner/Spinner'

import { getEntities as getInvoices, getInvoiceItemsArray } from '../../../store/invoices/selectors';
import { getEntities as getCustomers } from '../../../store/customers/selectors';
import { getEntities as getProducts } from '../../../store/products/selectors';




class ViewInvoice extends Component {

  componentDidMount() {
    this.props.getInvoiceItems(this.props.match.params.invoiceId);
    this.props.getInvoice(this.props.match.params.invoiceId);
  }


  render () {
    const {
      invoices,
      customers,
      // invoice,
      products,
      invoiceItems
    } = this.props;


    const neededInvoice = invoices[this.props.match.params.invoiceId];
    const neededCustomer = customers[neededInvoice && neededInvoice.customer_id]


    if(!neededInvoice || !neededCustomer  ) {
      return <Spinner />
    }


    return (
      <Paper style={styles.wrapper}>
        <Link to="/customers">
          <Typography variant="h6" gutterBottom style={styles.tableHeader}>
            {neededCustomer.name}
          </Typography>
        </Link>
        <div style={{display: "flex"}}>
          <Paper style={styles.root}>

            <Table style={styles.table}>
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
                        {products[invoiceItem.product_id].name}
                      </TableCell>
                      <TableCell align="right">
                        {invoiceItem.quantity}

                      </TableCell>
                      <TableCell align="right">
                        {invoiceItem.quantity * products[invoiceItem.product_id].price}
                      </TableCell>
                    </TableRow>
                  ))

                }

                <TableRow>
                  <TableCell/>
                  <TableCell colSpan={1}>Total</TableCell>
                  <TableCell align="right">
                    {neededInvoice ? neededInvoice.total : 0}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>

          <Paper style={styles.rootRight}>
            <Typography variant="h6" align="center" gutterBottom style={styles.tableHeader}>
              Discount (%)
            </Typography>
            <Typography variant="h4" align="center" gutterBottom style={styles.tableHeader}>
              {neededInvoice && neededInvoice.discount ? neededInvoice.discount : 0}
            </Typography>
          </Paper>
        </div>
      </Paper>
    );
  }
}

const mapStateToProps =  state => {
  return {
    invoices: getInvoices(state),
    products: getProducts(state),
    customers: getCustomers(state),
    invoiceItems: getInvoiceItemsArray(state)
  }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getInvoiceItems,
    getInvoice
  }, dispatch);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ViewInvoice));