import React, {Component} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import StyledTableCell from "../UI/Table/StyledTableCell";
import StyledTableRow from "../UI/Table/StyledTableRow";
import { styles } from "../UI/shared/styles";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProducts } from '../../store/products/actions';

import { getProductsArray } from '../../store/products/selectors';



class Products extends Component {

  render () {

    const {
      products
    } = this.props;


    const productsRows =  products.map(product => (
        <StyledTableRow key={product._id}>
          <StyledTableCell component="th" scope="row">{product.name}</StyledTableCell>
          <StyledTableCell >{product.price}</StyledTableCell>
        </StyledTableRow>
      ))


    return (
      <Paper style={styles.root}>
        <Table style={styles.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell >Product Name</StyledTableCell>
              <StyledTableCell >Price</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {productsRows}

          </TableBody>
        </Table>
      </Paper>
    );
  }

}

const mapStateToProps =  state => {
  return {
    products: getProductsArray(state),
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getProducts
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Products);