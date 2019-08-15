import React, {Component} from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { Link, withRouter } from 'react-router-dom';
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
        <AppBar position="static" >
          <Container>
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
              {
                this.props.location.pathname !== "/newinvoice"
                  ?
                  <Link to="/newinvoice">
                    <Typography variant="h6" color="textPrimary"> + New Invoice</Typography>
                  </Link>
                  : null
              }
            </Toolbar>
          </Container>
        </AppBar>

      </div>
    );
  }
}
const mapStateToProps =  state => {
  return {
    invoices: state.invoices.invoices,
  }
}

export default connect(mapStateToProps)(withRouter(NavTabs));