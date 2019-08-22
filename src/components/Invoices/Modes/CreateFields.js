import React, {Component} from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Field} from "redux-form";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";

class CreateFields extends Component {
  render() {
    const { renderSelectFieldProduct, renderTextField, classes, products, handleChange} = this.props;

    return (
      <div>
        <ListItem>
          <ListItemText>
            {/*PRODUCT NAME*/}
            <div>
              <Field
                className={classes.formControl}
                name="productName"
                // value={this.state.productName}
                component={renderSelectFieldProduct}
                onChange={handleChange}
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
                name="quantity"
                className={classes.numberFormControl}
                component={renderTextField}
                label="0"
                type='number'
                onChange={handleChange}
                // value={this.state.quantity}
                inputProps={{
                  step: 1, // 5 min
                }}
              />
            </div>
          </ListItemText>

          <ListItemText >
            {/*{isNaN(this.state.sum) ? null : this.state.sum }*/}
          </ListItemText>
        </ListItem>
        <Divider />
      </div>
    );
  }
}

export default CreateFields;