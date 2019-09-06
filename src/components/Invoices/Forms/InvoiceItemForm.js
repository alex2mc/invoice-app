import React from 'react';
import { useSelector } from "react-redux";
import { getEntities as getProductsEntities } from "../../../store/products/selectors";

import { ErrorMessage, Field } from "formik";
import { TextField } from "formik-material-ui";
import { ListItem, ListItemText }from "@material-ui/core";
import { styles } from "./styles";

import ProductSelector from "./utility/ProductSelector";
import { requiredProduct, isQuantity } from "../../../shared/validators/validators";
import {calculateInvoiceItemPrice} from "./utility/utils";




const InvoiceItemForm = ({values: {items}, arrayHelpers, handleChange, getProducts, onProductChange,  ...props}) => {
  // console.log(values);

  const handleProductChange = (e, index) => {
    handleChange(e);
    onProductChange(index);
    if(index === (items.length - 1)) {
      arrayHelpers.push( {product_id: '', quantity: 1})
    }
  }

  const handleRemovingInvoiceItem = (index) => {
      arrayHelpers.remove(index)
  }

  const productsEntities = useSelector(state => getProductsEntities(state))

  return (
    <>
      {items.map((item, index) => (
        <div key={index}>

          <ListItem>
            <ListItemText style={styles.product}>
              <Field
                name={`items.${index}.product_id`}
                component={ProductSelector}
                validate={(e) => requiredProduct(e, index)} //TODO: remove lambda functions
                onChange={(e) => handleProductChange(e, index)}
              />
              {/*<ErrorMessage name={`items.${index}.product_id`}>{msg => <div style={styles.errorMessage}>{msg}</div>}</ErrorMessage>*/}
            </ListItemText>

            <ListItemText style={styles.quantity}>
              <Field
                type="number"
                name={`items.${index}.quantity`}
                label="q-ty"
                component={TextField}
                validate={isQuantity}
                style={styles.numberFormControl}
                inputProps={{
                  min: 1,
                  max: 100
                }}
              />
            </ListItemText>

            <ListItemText style={styles.price}>
              {
               productsEntities[items[index].product_id]
                 ? (calculateInvoiceItemPrice(productsEntities, items[index])).toFixed(2)
                 : 0
              }
            </ListItemText>

             <ListItemText style={styles.remove}>
               {
                 items[index].product_id
                 ?
                  <button
                    type="button"
                    style={styles.buttonRemove}
                    onClick={() => handleRemovingInvoiceItem(index)}
                  >
                    x
                  </button>
                 : null
               }
            </ListItemText>


          </ListItem>

        </div>
      ))}

    </>
  )
}



export default InvoiceItemForm;