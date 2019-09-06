import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import ColorButtonGreen from "../../UI/Buttons/ColorButtonGreen";
import { TextField } from 'formik-material-ui';
import {connect, useSelector} from "react-redux";
import { postInvoice } from "../../../store/invoices/actions";
import { bindActionCreators } from "redux";
import Container from "@material-ui/core/Container";
import CustomerSelector from "./utility/CustomerSelector";
import { isDiscount, isRequired } from "../../../shared/validators/validators";
import InvoiceItemForm from "./InvoiceItemForm";
import Total from "./utility/Total";
import Paper from "@material-ui/core/Paper";
import { styles } from './styles';
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {getEntities as getProductsEntities} from "../../../store/products/selectors";


const InvoiceForm = ({postInvoice, ...props}) => {

  const productsEntities = useSelector(state => getProductsEntities(state))
  return (
    <Container>
      <Paper style={styles.wrapper}>
        <Formik
          initialValues={{discount: 0, customer_id: '', items: [{product_name: '', quantity: 1}] }}
          onSubmit={(values, {setSubmitting}) => {
            const totalReduceCb = (acc, it) =>
              acc + ((( productsEntities[it.product_name] && productsEntities[it.product_name].price) || 0) * it.quantity)
            const totalWithoutDiscount = values.items.reduce(totalReduceCb, 0)

            const discount = values.discount;

            const discountIntoMoney = (discount * totalWithoutDiscount) / 100
            const total = totalWithoutDiscount - discountIntoMoney
            const totalToFixed = total.toFixed(2)
            console.log(totalToFixed);

            const filteredItems = values.items.filter(item => item.product_name)

            const reducedItems = filteredItems.reduce((acc, item) => {
              return [...acc,
                {
                  quantity: +item.quantity,
                  product_id: item.product_name
                }
              ]
            }, [])

            const payload = {customer_id: values.customer_id, discount, total: +totalToFixed, items: reducedItems}
            console.log(payload);

            postInvoice(payload)

            props.history.push("/invoices")

            setSubmitting(false);
          }}
        >

          {({isSubmitting, values, handleChange}) => (

            <Form>
              <Field
                name="customer_id"
                validate={isRequired}
                component={CustomerSelector}
              />
              <ErrorMessage name="customer_id" component="div" />

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
                              arrayHelpers={arrayHelpers}
                              values={values}
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
                  // disabled
                  disabled={isSubmitting}
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
                />
                <ErrorMessage name="discount" component="div" />
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