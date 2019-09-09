import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import { getCustomers } from "../../../../store/customers/actions";
import { getCustomersArray } from "../../../../store/customers/selectors";
import { MenuItem, FormControl, Select, InputLabel, FormHelperText } from "@material-ui/core";
import { styles } from './styles';



const CustomerSelector = ({getCustomers, field, form, ...props}) => {
  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  const customers = useSelector(state => getCustomersArray(state))


  return (
    <FormControl
      style={styles.formControl}
      error={form.touched.customer_id && !!form.errors.customer_id}
    >
      <InputLabel htmlFor={field.name}>Select Name</InputLabel>
      <Select
        {...field}
        id={field.name}
        margin="dense"
        style={styles.selectEmpty}
        {...props}
      >
        {
          customers.map(customer => (
            <MenuItem key={customer._id} value={customer._id}>{customer.name}</MenuItem>
          ))
        }
      </Select>
      <FormHelperText>{form.touched.customer_id && form.errors.customer_id}</FormHelperText>
    </FormControl>
  )
}


const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getCustomers
  }, dispatch);

export default connect(null, mapDispatchToProps)(CustomerSelector);