import React from 'react';
import { Field } from "formik";
import {TextField} from "formik-material-ui";
import Divider from "@material-ui/core/Divider";
import ProductSelector from "./utility/ProductSelector";
import {useSelector} from "react-redux";
import { getEntities as getProductsEntities } from "../../../store/products/selectors";

const InvoiceItemForm = ({values, arrayHelpers, handleChange, getProducts,  ...props}) => {
  // console.log(values);

  const HandleProductChange = (e, index) => {
    handleChange(e);
    if(index === (values.items.length - 1)) {
      arrayHelpers.push( {product_name: '', quantity: 1})
    }
  }

  const productsEntities = useSelector(state => getProductsEntities(state))

  return (
    <>
      {values.items.map((item, index) => (
        <div key={index}>

          <Field
            name={`items.${index}.product_name`}
            component={ProductSelector}
            onChange={(e) => HandleProductChange(e, index)}
          />


          <Field
            type="number"
            name={`items.${index}.quantity`}
            label="q-ty"
            component={TextField}
          />

          <span>

          <Field
            name={`items.${index}`}
            render={({ field }) => (
              <span>
                {(productsEntities[field.value.product_name] && productsEntities[field.value.product_name].price * field.value.quantity) || 0}
              </span>
            )}
          />
          </span>


          <Divider />
          <br/>
          <br/>
          <br/>


        </div>
      ))}

    </>
  )
}



export default InvoiceItemForm;