import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Select } from 'formik-material-ui';
import ColorButtonGreen from "../../UI/Buttons/ColorButtonGreen";
import MenuItem from "@material-ui/core/MenuItem";
import * as Yup from 'yup';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {connect, useSelector} from "react-redux";
import { getCustomersArray } from "../../../store/customers/selectors";
import { bindActionCreators } from "redux";
import { getCustomers } from "../../../store/customers/actions";

const InvoiceForm = ({getCustomers, ...props}) => {

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  const customers = useSelector(state => getCustomersArray(state))
  return (
    <>
      <Formik
        initialValues={{discount: 0, customer_id: ''}}
        onSubmit={(values, {setSubmitting}) => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }}
        validationSchema={Yup.object().shape({
          discount: Yup.number()
            .min(0)
            .max(50),
          customer_id: Yup.object()
            .required('Customer Name is required')
        })}
      >

        {({isSubmitting}) => (
          <Form>
            <Field
              type="number"
              name="discount"
              label="discount"
              validate={(v) => v > 50}
              component={TextField}
              inputProps={{
                min: 0,
              }}
            />
            <ErrorMessage name="discount" component="div" />

            <div>
              <FormControl>
                <InputLabel shrink={true} htmlFor="customer_id">
                  Select Customer Name
                </InputLabel>
                <Field
                  label="Select Customer Name"
                  name="customer_id"
                  select
                  component={Select}
                  inputProps={{name: 'customer_id', id: 'customer_id'}}
                >
                  { customers.map(customer => (
                      <MenuItem key={customer._id} value={customer._id}>{customer.name}</MenuItem>
                    )
                  )}
                </Field>
              </FormControl>
            </div>
            <ErrorMessage name="customer_id" component="div" />
            <ColorButtonGreen type="submit" disabled={isSubmitting}>
              Submit
            </ColorButtonGreen>
          </Form>
        )}

      </Formik>
    </>
  )
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getCustomers
  }, dispatch);

export default connect(null, mapDispatchToProps)(InvoiceForm);