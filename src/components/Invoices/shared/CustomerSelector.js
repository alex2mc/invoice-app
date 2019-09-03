import React from "react";
import { useSelector } from 'react-redux';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { renderFromHelper }from './utilities/renderFromHelper'
import MenuItem from "@material-ui/core/MenuItem";
import { Field } from "redux-form";
import { getCustomersArray } from '../../../store/customers/selectors';

import { styles } from './styles';
import { required } from '../../../shared/validators'

export const renderSelectFieldCustomer = ({
                                     input,
                                     label,
                                     meta: { touched, error },
                                     children,
                                     ...custom
                                   }) => (
  <FormControl error={touched && error}>
    <InputLabel htmlFor="customer-name">Select Name</InputLabel>
    <Select
      {...input}
      {...custom}
      inputProps={{
        name: 'customerName',
        id: 'customer-name'
      }}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
);

const CustomerSelector = () => {
  const customers = useSelector(state => getCustomersArray(state))
  return (
    <Field
      style={styles.formControl}
      name="customer_id"
      validate={[required]}
      component={renderSelectFieldCustomer}
      label="Select Name"
    >
      {
        customers
          ? customers.map(customer => (
            <MenuItem key={customer._id} value={customer._id}>{customer.name}</MenuItem>
          ))
          : null
      }
    </Field>
  )
}

export default CustomerSelector;