import React, {Component} from 'react';
import { withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// import {bindActionCreators} from "redux";
// import {fetchInvoices, postInvoice} from "../../../store/actions/invoices";
import {connect} from "react-redux";

import Spinner from '../../UI/Spinner/Spinner'
import { Link } from 'react-router-dom'


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

  render () {
    const { classes, customers, isCustomersLoading }= this.props;

    const neededCustomer = customers && 
      customers.find(customer => this.props.match.params.customerId === customer.id)

    if(isCustomersLoading || !neededCustomer) {
      return <Spinner />
    }

    return (
      <Paper className={classes.wrapper}>
        <Typography variant="subtitle2" gutterBottom className={classes.tableHeader}>Invoice id</Typography>
        <Link to="/customers">
          <Typography variant="h6" gutterBottom className={classes.tableHeader}>{neededCustomer.name}</Typography>
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
                    <TableCell>fffffffffff</TableCell>
                    <TableCell align="right">ffffffffffff</TableCell>
                    <TableCell align="right">fffffffffff</TableCell>
                  </TableRow>


                <TableRow>
                  <TableCell/>
                  <TableCell colSpan={1}>Total</TableCell>
                  <TableCell align="right">fffffffffff</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>

          <Paper className={classes.rootRight}>
            <Typography variant="h6" align="center" gutterBottom className={classes.tableHeader}>Discount
              (%)</Typography>
            <Typography variant="h4" align="center" gutterBottom className={classes.tableHeader}>15</Typography>
          </Paper>
        </div>
      </Paper>
    );
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

// const mapDispatchToProps = dispatch =>
//   bindActionCreators({
//     postInvoice,
//     fetchInvoices
//   }, dispatch);

export default withStyles(styles)(connect(mapStateToProps)(ViewMode));