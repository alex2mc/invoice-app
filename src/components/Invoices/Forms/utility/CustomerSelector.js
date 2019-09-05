import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import { getCustomers } from "../../../../store/customers/actions";
import { getCustomersArray } from "../../../../store/customers/selectors";
import { Field } from "formik";
import { TextField } from "formik-material-ui";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";



const CustomerSelector = ({getCustomers}) => {
  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  const customers = useSelector(state => getCustomersArray(state))


  return (
    <FormControl>
      <Field
        name="customer_id"
        label="Select Customer Name"
        margin="dense"
        select
        component={TextField}
      >
        {
          customers.map(customer => (
            <MenuItem key={customer._id} value={customer._id}>{customer.name}</MenuItem>
          ))
        }
      </Field>
    </FormControl>
  )
}


const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getCustomers
  }, dispatch);

export default connect(null, mapDispatchToProps)(CustomerSelector);