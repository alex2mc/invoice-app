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
// import Spinner from '../../UI/Spinner/Spinner'

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
    const { classes, customers, invoice, products, invoiceItems } = this.props;

    console.log(invoiceItems);
    console.log(invoice);

    // const neededList = invoicesList &&
    //   invoicesList.find(invoiceList => this.props.match.params.invoiceId === invoiceList.invoice_id)
    //
    // const neededProduct = neededList
    //   ? products &&  products.find(product => neededList.product_id === product.id)
    //   : null
    //
    // const neededInvoice = invoices &&
    //   invoices.find(invoice => this.props.match.params.invoiceId  === invoice.id)
    //
    // const neededCustomer = neededInvoice
    //   ? customers &&
    //     customers.find(customer => neededInvoice.customer === customer.id)
    //   : null




    //
    // if(!neededList  || !neededProduct || !neededInvoice || !neededCustomer) {
    //   return <Spinner />
    // }

    // const invoiceSubtotal = neededList.quantity * neededProduct.price;
    //
    // const invoiceDiscount = (neededInvoice.discount * invoiceSubtotal) / 100;
    // const invoiceTotal = invoiceSubtotal - invoiceDiscount;

    // console.log(invoiceTotal)
    return (
      <Paper className={classes.wrapper}>
        <Typography variant="subtitle2" gutterBottom className={classes.tableHeader}>{invoice._id}</Typography>
        <Link to="/customers">
          <Typography variant="h6" gutterBottom className={classes.tableHeader}>
            {/*{neededCustomer.name}*/}
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

                  <TableRow >
                    <TableCell>
                      {/*{neededProduct.name}*/}
                    </TableCell>
                    <TableCell align="right">
                      {/*{neededList.quantity}*/}
                    </TableCell>
                    <TableCell align="right">
                      {/*{neededProduct.price}*/}
                    </TableCell>
                  </TableRow>


                <TableRow>
                  <TableCell/>
                  <TableCell colSpan={1}>Total</TableCell>
                  <TableCell align="right">
                    {/*{invoiceTotal.toFixed(2)}*/}
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
              {/*{neededInvoice.discount}*/}
            </Typography>
          </Paper>
        </div>
      </Paper>
    );
  }
}

const mapStateToProps =  state => {
  return {
    products: state.products.products,
    isProductsLoading: state.products.isLoading,
    invoice: state.invoices.invoice,
    isInvoicesLoading: state.invoices.isLoading,
    customers: state.customers.customers,
    isCustomersLoading: state.customers.isLoading,
    invoiceItems: state.invoices.invoiceItems
  }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getInvoiceItems,
    getInvoice
  }, dispatch);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ViewMode));