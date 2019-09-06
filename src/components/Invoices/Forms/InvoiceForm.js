import React from 'react';
import { connect, useSelector} from "react-redux";
import { bindActionCreators } from "redux";
import { postInvoice } from "../../../store/invoices/actions";
import { getEntities as getProductsEntities } from "../../../store/products/selectors";
import { getIsPostInvoiceLoading } from "../../../store/invoices-requests/selectors";

import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { Container, Paper, Typography, List, ListItem, ListItemText, Divider } from "@material-ui/core";
import { TextField } from 'formik-material-ui';
import ColorButtonGreen from "../../UI/Buttons/ColorButtonGreen";
import { styles } from './styles';

import CustomerSelector from "./utility/CustomerSelector";
import InvoiceItemForm from "./InvoiceItemForm";
import Total from "./utility/Total";

import { isDiscount, required } from "../../../shared/validators/validators";
import {calculateInvoiceItemsTotal, makeItemsQuantityNumber} from './utility/utils'




const InvoiceForm = ({postInvoice, ...props}) => {
  const productsEntities = useSelector(state => getProductsEntities(state))
  const isInvoicesLoading = useSelector(state => getIsPostInvoiceLoading(state))
  return (
    <Container>
      <Paper style={styles.wrapper}>
        <Formik
          initialValues={{discount: 0, customer_id: '', items: [{product_id: '', quantity: 1}] }}
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

            postInvoice(payload)
            props.history.push("/invoices")

            setSubmitting(false);
          }}
        >

          {({isSubmitting, values, handleChange}) => (

            <Form>
              <Field
                name="customer_id"
                validate={required}
                component={CustomerSelector}
              />
              {/*<ErrorMessage name="customer_id">{msg => <div style={styles.errorMessage}>{msg}</div>}</ErrorMessage>*/}

              <div  style={styles.main}>
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
                                arrayHelpers={arrayHelpers}
                                values={values}
                                onProductChange={(index) => {console.log(index)}}
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
                    // disabled={isSubmitting}
                  >
                    Submit
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