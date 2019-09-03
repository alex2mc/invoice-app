import React, { useEffect } from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Field } from "redux-form";
import Divider from "@material-ui/core/Divider";

import { styles } from './styles';
import { renderTextField } from "../shared/renderTextField";
import ProductSelector from '../shared/ProductSelector';
import { useSelector } from "react-redux";
import { getEntities as getProducts } from "../../../store/products/selectors";

const PriceReadable = ({input, get, quantity = 1, ...props}) => {

  const products = useSelector(state => getProducts(state))
  const productId = input.value ? input.value : 'no id'
  const product = products[productId]
  const price = (product && product.price * quantity)
  const priceToFixed = price && price.toFixed(2)

  return priceToFixed || 0
}

export default function CreateFields({fields, ...props}) {

  useEffect(() => {
   addNewRow()
  }, []);

  const addNewRow = () => {
    fields.push({quantity: 1})
  }

  const handleSelectChange = (e, value, prevValue, name) => {
    if(!prevValue) {
      addNewRow()
    }
  }

    return (
      <div>
        {fields.map((item, fieldsArrayIndex, form)=> {
          const quantity = form.get(fieldsArrayIndex).quantity
          return (

            <div key={fieldsArrayIndex}>
              <ListItem>

                <ListItemText>
                  <div>
                    <ProductSelector
                      handleSelectChange={handleSelectChange}
                      item={item}
                    />
                  </div>
                </ListItemText>

                <ListItemText >
                  <div>
                    <Field
                      name={`${item}.quantity`}
                      style={styles.numberFormControl}
                      component={renderTextField}
                      type='number'
                      inputProps={{
                        min: 1,
                      }}
                    />
                  </div>
                </ListItemText>

                <ListItemText >
                  <Field
                    component={PriceReadable}
                    name={`${item}.product_id`}
                    quantity={quantity}
                    fieldsArrayIndex={fieldsArrayIndex}
                  />
                </ListItemText>
              </ListItem>
              <Divider />
            </div>
          )
        })}
      </div>
    );
}
