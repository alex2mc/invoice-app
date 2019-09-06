import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import { getProducts } from "../../../../store/products/actions";
import { getProductsArray } from "../../../../store/products/selectors";
import {MenuItem, FormControl, Select, InputLabel, FormHelperText} from "@material-ui/core";
import { styles } from './styles';



const ProductSelector = ({getProducts, field, form, ...props}) => {
  console.log(form.errors.items);
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const products = useSelector(state => getProductsArray(state))

  return (
    <FormControl style={styles.formControl} >
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
      {/*<FormHelperText> {form.errors.items}</FormHelperText>*/}
    </FormControl>
  )
}


const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getProducts
  }, dispatch);

export default connect(null, mapDispatchToProps)(ProductSelector);