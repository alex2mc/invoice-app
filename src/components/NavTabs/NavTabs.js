import React, {Component} from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom';
import {connect} from 'react-redux';





class NavTabs extends Component {
  render () {
    const { invoices } = this.props;

    const invoicesAmount = invoices.length

    const toolbarStyles = {
      display: 'flex',
      justifyContent: 'space-between'
    }


    return (
      <div>
        <AppBar position="static">
          <Toolbar variant="dense" style={toolbarStyles}>
            <Link to="/">
              <Typography variant="h6" color="textPrimary"> Logo</Typography>
            </Link>
            <Link to="/products">
              <Typography variant="h6" color="textPrimary"> Products</Typography>
            </Link>
            <Link to="/customers">
              <Typography variant="h6" color="textPrimary"> Customers</Typography>
            </Link>
            <Link to="/invoices">
              <Typography variant="h6" color="textPrimary"> Invoices ({invoicesAmount})</Typography>
            </Link>
            <Link to="/newinvoice">
              <Typography variant="h6" color="textPrimary"> + New Invoice</Typography>
            </Link>
          </Toolbar>
        </AppBar>

      </div>
    );
  }
}
const mapStateToProps =  state => {
  return {
    invoices: state.invoice.invoices,
  }
}

export default connect(mapStateToProps)(NavTabs);