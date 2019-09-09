import React from 'react';
import { useSelector } from "react-redux";
import { getEntities as getProductsEntities } from "../../../store/products/selectors";

import { Field } from "formik";
import { TextField } from "formik-material-ui";
import { ListItem, ListItemText }from "@material-ui/core";
import { styles } from "./styles";

import ProductSelector from "./utility/ProductSelector";
import { isQuantity, required } from "../../../shared/validators/validators";
import { calculateInvoiceItemPrice } from "./utility/utils";




const InvoiceItemForm = ({values: {items}, handleChange, onRemovingInvoiceItem, onProductChange,  ...props}) => {

  const handleProductChange = (e, index) => {
    handleChange(e);
    onProductChange(index)
  }

  const handleRemovingInvoiceItem = (index) => {
    onRemovingInvoiceItem(index)
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
                validate={items.length === 1 ? required : null}
                onChange={(e) => handleProductChange(e, index)}
              />
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