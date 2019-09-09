import React from 'react';
import { connect, useSelector} from "react-redux";
import { bindActionCreators } from "redux";
import { postInvoice } from "../../../store/invoices/actions";
import { getEntities as getProductsEntities } from "../../../store/products/selectors";
import { getIsPostInvoiceLoading } from "../../../store/invoices-requests/selectors";

import { Formik, Form, Field, FieldArray } from 'formik';
import { Container, Paper, Typography, List, ListItem, ListItemText, Divider } from "@material-ui/core";
import { TextField } from 'formik-material-ui';
import ColorButtonGreen from "../../UI/Buttons/ColorButtonGreen";
import { styles } from './styles';

import CustomerSelector from "./utility/CustomerSelector";
import InvoiceItemForm from "./InvoiceItemForm";
import Total from "./utility/Total";

import { isDiscount, required } from "../../../shared/validators/validators";
import { calculateInvoiceItemsTotal, makeItemsQuantityNumber } from './utility/utils'




const InvoiceForm = ({postInvoice, initialValues, action, buttonText, ...props}) => {
  console.log('initialValues', initialValues);
  const productsEntities = useSelector(state => getProductsEntities(state))
  const isInvoicesLoading = useSelector(state => getIsPostInvoiceLoading(state))

  const handleProductChange = (arrayHelpers, index) => {
    const items = arrayHelpers.form.values[arrayHelpers.name];
    if (index >= (items.length -1)) {
      arrayHelpers.push({quantity: 1, product_id: ''});
    }
  }

  const handleRemovingInvoiceItem = (arrayHelpers, index) => {
      arrayHelpers.remove(index)
  }

  return (
    <Container>
      <Paper style={styles.wrapper}>
        <Formik
          initialValues={initialValues}
          onSubmit={({items, discount, customer_id}, {setSubmitting}) => {

            const filteredItems = items.filter(item => item.product_id)
            const reducedItems = makeItemsQuantityNumber(filteredItems)

            const total = calculateInvoiceItemsTotal(reducedItems, discount, productsEntities)

            const payload = {
              items: reducedItems,
              discount,
              customer_id,
              total,
            }

            action(payload)
            props.history.push("/invoices")

            setSubmitting(false);
          }}
        >

          {({values, handleChange}) => (

            <Form>
              <Field
                name="customer_id"
                validate={required}
                component={CustomerSelector}
              />

              <div style={styles.main}>
                <Paper style={styles.items}>

                  <List>
                    <ListItem>
                      <ListItemText style={styles.product}>Products</ListItemText>
                      <ListItemText style={styles.quantity}>Q-ty</ListItemText>
                      <ListItemText style={styles.price}>Price ($)</ListItemText>
                    </ListItem>
                    <Divider />

                <FieldArray name="items"
                            render={arrayHelpers => (
                              <InvoiceItemForm
                                name={'items'}
                                values={values}
                                onProductChange={handleProductChange.bind(this, arrayHelpers)}
                                onRemovingInvoiceItem={handleRemovingInvoiceItem.bind(this, arrayHelpers)}
                                handleChange={handleChange}
                                {...props}/>
                            )}
                />
                <Divider />

                    <ListItem>
                      <ListItemText style={styles.totalHeader}>Total</ListItemText>
                      <ListItemText style={styles.total}>
                        <Field
                          name="total"
                          component={Total}
                        />
                      </ListItemText>
                    </ListItem>
                  </List>

                <div style={styles.buttonWrapper}>
                  <ColorButtonGreen
                    type="submit"
                    disabled={isInvoicesLoading}
                  >
                    {buttonText}
                  </ColorButtonGreen>
                </div>
                </Paper>

                <Paper style={styles.discount}>
                  <Typography variant="h6" align="center" gutterBottom>Discount (%)</Typography>
                  <Field
                    type="number"
                    name="discount"
                    label="discount"
                    validate={isDiscount}
                    component={TextField}
                    style={styles.numberFormControl}
                    inputProps={{
                      min: 0,
                      max: 50
                    }}
                  />
                </Paper>
              </div>
            </Form>
          )}

        </Formik>
      </Paper>
    </Container>
  )
};


const mapDispatchToProps = dispatch =>
  bindActionCreators({
    postInvoice
  }, dispatch);

export default connect(null, mapDispatchToProps)(InvoiceForm);