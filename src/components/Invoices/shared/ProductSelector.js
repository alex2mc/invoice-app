import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { renderFromHelper } from "./utilities/renderFromHelper";
import { styles } from "../forms/styles";
import MenuItem from "@material-ui/core/MenuItem";
import { Field } from "redux-form";
import { useSelector } from "react-redux";
import { getProductsArray } from "../../../store/products/selectors";
import { required } from '../../../shared/validators'


export const renderSelectFieldProduct = ({
                                    input,
                                    label,
                                    meta: { touched, error },
                                    children,
                                    ...custom
                                  }) => (
  <FormControl error={touched && error}>
    <InputLabel htmlFor="product-name">Add Product</InputLabel>
    <Select
      {...input}
      {...custom}
      inputProps={{
        name: 'product_id',
        id: 'product-name',
      }}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
);


const ProductSelector = ({ handleSelectChange, item }) => {
  const products = useSelector(state => getProductsArray(state))
  return (
    <Field
      style={styles.formControl}
      name={`${item}.product_id`}
      validate={[(value) => value ? undefined : 'Required']}
      component={renderSelectFieldProduct}
      onChange={handleSelectChange}
      label="Add Product"
    >
      {
        products
          ? products.map(product => (
            <MenuItem key={product._id} value={product._id}>{product.name}</MenuItem>
          ))
          : null
      }
    </Field>
  )
}

export default ProductSelector;