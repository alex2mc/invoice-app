import React, {useEffect} from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { Link, withRouter } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { getInvoicesArray } from '../../store/invoices/selectors';
import { styles } from './styles'
import { bindActionCreators } from 'redux';
import { getInvoices } from '../../store/invoices/actions';





const NavTabs = ({getInvoices, ...props}) => {

  useEffect(() => {
    getInvoices();
  }, [getInvoices]);

  const invoices = useSelector(state => getInvoicesArray(state))

  const invoicesAmount = invoices.length

    return (
      <div>
        <AppBar position="static" >
          <Container>
            <Toolbar variant="dense" style={styles.toolbar}>
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
                props.location.pathname !== "/invoice/new"
                  ?
                  <Link to="/invoice/new">
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
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getInvoices,
  }, dispatch);



export default connect(null, mapDispatchToProps)(withRouter(NavTabs));