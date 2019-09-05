import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import { getProducts } from "../../../../store/products/actions";
import { getProductsArray } from "../../../../store/products/selectors";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { styles } from './styles';



const ProductSelector = ({getProducts, field, ...props}) => {
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const products = useSelector(state => getProductsArray(state))

  return (
    <FormControl style={styles.formControl}>
      <InputLabel htmlFor={field.name}>Select Product</InputLabel>
      <Select
        {...field}
        id={field.name}
        margin="dense"
        style={styles.selectEmpty}
        {...props}
      >
        {
          products.map(product => (
            <MenuItem key={product._id} price={product.price} value={product._id}>{product.name}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}


const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getProducts
  }, dispatch);

export default connect(null, mapDispatchToProps)(ProductSelector);