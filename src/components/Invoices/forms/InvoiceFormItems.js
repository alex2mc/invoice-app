import React, { Component } from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Field } from "redux-form";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import { renderSelectFieldProduct } from '../shared/ProductSelector'

import { styles } from './styles';
import { renderTextField } from "../shared/renderTextField";

const PriceReadable = ({input, get, quantity = 1, ...props}) => {
  const productCost = input.value ? input.value.price : 0
  const price = (productCost * quantity).toFixed(2) || '-'

  return price
}

class CreateFields extends Component {
  componentDidMount() {
    this.addNewRow()
  }

  addNewRow = () => {
    this.props.fields.push({quantity: 1})
  }

  handleSelectChange = (e, value, prevValue, name) => {
    if(!prevValue) {
      this.addNewRow()
    }
  }


  render() {
    const { products} = this.props;

console.log(this.props)
    return (
      <div>
        {this.props.fields.map((item, fieldsArrayIndex, form)=> {
          const quantity = form.get(fieldsArrayIndex).quantity
          // console.log('quantity', quantity);
          return (

            <div key={fieldsArrayIndex}>
              <ListItem>

                <ListItemText>
                  {/*PRODUCT NAME*/}
                  <div>
                    <Field
                      style={styles.formControl}
                      name={`${item}.productName`}
                      component={renderSelectFieldProduct}
                      onChange={this.handleSelectChange}
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
                  </div>
                </ListItemText>

                <ListItemText >
                  {/*QUANTITY*/}
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
                    name={`${item}.productName`}
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
}

export default CreateFields;