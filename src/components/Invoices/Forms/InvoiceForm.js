import React, {useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import ColorButtonGreen from "../../UI/Buttons/ColorButtonGreen";
import { TextField } from 'formik-material-ui';
import {connect} from "react-redux";
import {getCustomers} from "../../../store/customers/actions";
import {bindActionCreators} from "redux";
import Container from "@material-ui/core/Container";
import CustomerSelector from "./utility/CustomerSelector";
// import InvoiceItemForm from './InvoiceItemForm'


const InvoiceForm = ({getCustomers, ...props}) => {


  const isRequired = (value) => {
    console.log(value);
    return !value ? "Required" : null;
  }

  const isMinValue0 = (value) => {
      return value < 0 ? "should be bigger" : ""
  }

  const isDiscount = (value) => {
    if (value < 0) {
      return "should be at least 0"
    } else if (value > 50) {
      return "maximum 50"
    }
    return ""
  }

  return (
    <Container>
      <Formik
        initialValues={{discount: 0, customer_id: '', products: [{product_name: '', quantity: 1}] }}
        onSubmit={(values, {setSubmitting}) => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }}
      >

        {({isSubmitting, values}) => (

          <Form>

            <Field
              type="number"
              name="discount"
              label="discount"
              validate={isDiscount}
              component={TextField}
            />

            <ErrorMessage name="discount" component="div" />



            <br/>

              <Field
                name="customer_id"
                validate={isRequired}
                component={CustomerSelector}
              />


            <ErrorMessage name="customer_id" component="div" />
            <br/>

            <FieldArray name="products"
                        render={arrayHelpers => (
                          <div>
                            {values.products.map((friend, index) => (
                              <div key={index}>
                                <Field name={`products[${index}].product_name`} />
                                <Field name={`products.${index}.quantity`} />
                              </div>
                            ))}
                          </div>
                        )}
            />

            <ColorButtonGreen type="submit" disabled={isSubmitting}>
              Submit
            </ColorButtonGreen>
          </Form>
        )}

      </Formik>
    </Container>
  )
};


const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getCustomers
  }, dispatch);

export default connect(null, mapDispatchToProps)(InvoiceForm);