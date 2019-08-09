import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom';





export default function NavTabs() {

  const toolbarStyles = {
    display: 'flex',
    justifyContent: 'space-between'
  }


  return (
    <div >
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
            <Typography variant="h6" color="textPrimary"> Invoices</Typography>
          </Link>
          <Link to="/newinvoice">
            <Typography variant="h6" color="textPrimary"> + New Invoice</Typography>
          </Link>
        </Toolbar>
      </AppBar>

    </div>
  );
}