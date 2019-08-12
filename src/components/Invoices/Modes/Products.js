import React, {Component} from 'react';


import Spinner from '../../UI/Spinner/Spinner';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../../../store/actions/products';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TableCell from "@material-ui/core/TableCell";





class Products extends Component {
  state = {
    productName: ''
  }

  handleChange = e => {
    const {name, value} = e.target
    this.setState(state => {
      return {
        ...state,
        [name]: value
      }
    })
  }

  render () {
    // const classes = useStyles();
    const {
      isLoading,
      // error,
      products
    } = this.props;


    const productsRows = products
      ? products.map(product => (
        <MenuItem id={product.id} key={product.id} value={product.name}>{product.name}</MenuItem>
      ))
      : null

    if(isLoading) {
      return <Spinner />
    }


    return (
      <form
        // className={classes.rootForm}
        autoComplete="off">
        <FormControl
          // className={classes.formControl}
        >
          <InputLabel htmlFor="product-name">Add Product</InputLabel>
          <Select
            value={this.state.productName}
            onChange={this.handleChange}
            inputProps={{
              name: 'productName',
              id: 'product-name',
            }}
          >

            {productsRows}
          </Select>
        </FormControl>
      </form>
    );
  }

}

const mapStateToProps =  state => {
  return {
    products: state.product.products,
    isLoading: state.product.isLoading
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchProducts
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Products);