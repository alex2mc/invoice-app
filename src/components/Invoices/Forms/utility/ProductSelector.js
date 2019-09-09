import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import { getProducts } from "../../../../store/products/actions";
import { getProductsArray } from "../../../../store/products/selectors";
import { MenuItem, FormControl, Select, InputLabel, FormHelperText } from "@material-ui/core";
import { styles } from './styles';
import _ from 'lodash'



const ProductSelector = ({getProducts, field, form, ...props}) => {
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const fieldError = _.get(form.errors, field.name)
  const fieldTouched = _.get(form.touched, field.name)

  const products = useSelector(state => getProductsArray(state))
  return (
    <FormControl
      style={styles.formControl}
      error={fieldTouched && !!fieldError}
    >
      <InputLabel htmlFor={field.name}>Select Product</InputLabel>
      <Select
        {...field}
        id={field.name}
        name={field.name}
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
      <FormHelperText>{fieldTouched && fieldError}</FormHelperText>
    </FormControl>
  )
}


const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getProducts
  }, dispatch);

export default connect(null, mapDispatchToProps)(ProductSelector);