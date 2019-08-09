import React, {Component} from 'react';


import Spinner from '../../UI/Spinner/Spinner';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../../../store/actions/products';
import MenuItem from "@material-ui/core/MenuItem";





class Products extends Component {

  componentDidMount() {
    this.props.fetchProducts();
  }

  render () {
    // const classes = useStyles();
    const {
      isLoading,
      // error,
      products
    } = this.props;

    const productsRows =  isLoading
      ? <Spinner />
      : products.map(product => (
        <MenuItem id={product.id} value={product.name}>{product.name}</MenuItem>
      ))



    return (
      {productsRows}
    );
  }

}

const mapStateToProps =  state => {
  return {
    products: state.product.products,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchProducts
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Products);