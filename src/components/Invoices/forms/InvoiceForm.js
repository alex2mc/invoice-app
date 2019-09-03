import React, {  } from 'react';
import {connect, } from 'react-redux';
import { Field, reduxForm, FieldArray } from 'redux-form';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography";

import ColorButtonGreen from "../../UI/Buttons/ColorButtonGreen";

import InvoiceFormItems from "./InvoiceFormItems";
import { styles } from './styles';
import CustomerSelector from '../shared/CustomerSelector';
import { renderTextField } from "../shared/renderTextField";
import { bindActionCreators, compose } from "redux";
import { postInvoice } from "../../../store/invoices/actions";
import { getEntities as getProducts } from "../../../store/products/selectors";
import { minValue0, maxValue50 } from '../../../shared/validators'
import { withRouter } from "react-router";



const CreateForm = ({ pristine, submitting, valid,  form, total, customer_id, discount, items, ...props }) => {

  const  handleSavingInvoice = (e) => {
    e.preventDefault();

    const payload = {customer_id, discount, total, items}
    props.postInvoice(payload);
    props.history.push("/invoices")
  }

    return (
      <form>
        <div>
          <CustomerSelector />
        </div>

        <div style={styles.body}>
          <Paper style={styles.root}>
            <List>
              <ListItem>
                <ListItemText>Products</ListItemText>
                <ListItemText>Q-ty</ListItemText>
                <ListItemText>Price ($)</ListItemText>
              </ListItem>
              <Divider />

              <FieldArray
                name="items"
                component={InvoiceFormItems}
              />

              <ListItem>
                <ListItemText>Total</ListItemText>
                <ListItemText>
                  {total}
                </ListItemText>
              </ListItem>
            </List>
          </Paper>

          <Paper style={styles.rootRight}>
            <Typography variant="h6" align="center" gutterBottom style={styles.tableHeader}>Discount (%)</Typography>
            <div>
              <Field
                name="discount"
                style={styles.numberFormControl}
                component={renderTextField}
                validate={[minValue0, maxValue50]}
                type='number'
                inputProps={{
                  min: 0,
                  max: 50,
                }}
              />
            </div>
          </Paper>

        </div>
        <div style={styles.button}>
          <ColorButtonGreen
            type="submit"
            disabled={!valid || submitting || pristine}
            onClick={handleSavingInvoice}
          >
            save invoice
          </ColorButtonGreen>
        </div>
      </form>
    )
}

const mapStateToProps = state => {
  const { CreateForm }  = state.form;
  const products = getProducts(state);

  const filteredItems = CreateForm && CreateForm.values && CreateForm.values.items && CreateForm.values.items.filter(item => item.product_id);
  const reducedItems = filteredItems && filteredItems.reduce((acc, item) => {
    return [...acc,
      {
        quantity: +item.quantity,
        product_id: item.product_id
      }
    ]
  }, []);

  const totalReduceCb = (acc, it) => {
    return acc + ((it && it.product_id && products && products[it.product_id] && +products[it.product_id].price)  * (+it.quantity || 1))}
  const totalWithoutDiscount = reducedItems ? reducedItems.reduce(totalReduceCb, 0) : 0

  const discount = (CreateForm && CreateForm.values && CreateForm.values.discount ? +CreateForm.values.discount : 0);
  const discountInMoney = (discount * totalWithoutDiscount) / 100;

  const totalWithoutToFixed = totalWithoutDiscount - discountInMoney;
  const total = +totalWithoutToFixed.toFixed(2) || 0;

  const customer_id = CreateForm && CreateForm.values && CreateForm.values.customer_id;

  return {
    form: state.form.CreateForm,
    total,
    customer_id,
    discount,
    items: reducedItems
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    postInvoice,
  }, dispatch);


export const InvoiceForm  = compose(
  reduxForm({
  form: 'CreateForm',
}),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),

) (withRouter(CreateForm))