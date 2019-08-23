import React, {Component} from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Field} from "redux-form";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import List from "./CreateForm";

const PriceReadable = ({input, get, quantity = 1, ...props}) => {
  const productCost = input.value ? input.value.price : 0
  const price = (productCost * quantity).toFixed(2) || '-'

  return price
}

class CreateFields extends Component {
  componentDidMount() {
    this.add()
  }

  add = () => {
    this.props.fields.push({quantity: 1})
  }

  handleSelectChange = (e, value, prevValue, name) => {
    if(!prevValue) {
      this.add()
    }
  }

  // total = () => {
  //   return 23213
  // }

  render() {
    const { renderSelectFieldProduct, renderTextField, classes, products} = this.props;


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
                    className={classes.formControl}
                    name={`${item}.productName`}
                    // value={this.state.productName}
                    component={renderSelectFieldProduct}
                    onChange={this.handleSelectChange}
                    label="Add Product"
                  >
                    {
                      products
                        ? products.map(product => (
                          <MenuItem key={product._id} value={product}>{product.name}</MenuItem>
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
                    className={classes.numberFormControl}
                    component={renderTextField}
                    type='number'
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