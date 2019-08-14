import React, { Component } from 'react';

import MenuItem from "@material-ui/core/MenuItem";

import { reduxForm, Field } from 'redux-form'
import TextField from 'redux-form-material-ui/lib/TextField';
import Select from 'redux-form-material-ui/lib/Select';






// const required = value => (value == null ? 'Required' : undefined);
// const email = value =>
//   (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
//     ? 'Invalid email'
//     : undefined);
// const tooBigDiscount = value => (value > 50 && value < 0 ? 'Discount is only from 0 to 50' : undefined);



class InvoiceCreateMode extends Component {


  render() {
    console.warn('YEAP')
    // console.log(this.props)
    // console.log(this.state)


    return (
        <form>

          <div >
            <Field
              name="customerName"
              component={Select}
              hintText="Select Name"
            >

              <MenuItem value="1" primaryText="1"/>
              <MenuItem value="2" primaryText="2"/>
              <MenuItem value="3" primaryText="3"/>

            </Field>
          </div>

          <div >
            <Field
              name="product-name"
              component={Select}
              hintText="Add Product"
            >
              <MenuItem value='PROD' primaryText='PROD' />
              <MenuItem value='PROD1' primaryText='PROD1' />
              <MenuItem value='PROD2' primaryText='PROD2' />
            </Field>
          </div>

          <div >
            <Field
              name="quantity"
              component={TextField}
              hintText="1"
            />
          </div>

          <div>
            <Field
              name="discount"
              component={TextField}
              hintText="0"
            />
          </div>

        </form>
    )
  }
}




export default reduxForm({
  form: 'createInvoice'
})(InvoiceCreateMode);