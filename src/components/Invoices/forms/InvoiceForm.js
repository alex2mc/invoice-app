import React, { useState } from 'react';
import {connect, useSelector} from 'react-redux';
import { Field, reduxForm, FieldArray } from 'redux-form';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography";

import ColorButtonGreen from "../../UI/Buttons/ColorButtonGreen";

// import validate from '../../../shared/validate';

import InvoiceFormItems from "./InvoiceFormItems";
import { styles } from './styles';
import CustomerSelector from '../shared/CustomerSelector';
import { renderTextField } from "../shared/renderTextField";
import { bindActionCreators, compose } from "redux";
import { postInvoice } from "../../../store/invoices/actions";
import { getEntities as getProducts } from "../../../store/products/selectors";


const CreateForm = ({ pristine, submitting, valid,  form, ...props}) => {

  const [total, setTotal] = useState(0)
  const products = useSelector(state => getProducts(state))


  const  handleSavingInvoice = (e) => {
    e.preventDefault();

    const customer_id = form.values.customer_id;

    const discount = +form.values.discount || 0;

    // const { product_id, quantity } = form.values.items
    // const quantityToNmbr = Number(quantity)
    // const upgradedItems = { product_id, quantityToNmbr}
    const filteredItems = form.values.items.filter(item => item.product_id);




    console.log(filteredItems);
    const totalReduceCb = (acc, it) =>
      acc + (((it.product_id && products[it.product_id].price) || 0) * (it.quantity || 1))
    const totalWithoutDiscount = filteredItems ? filteredItems.reduce(totalReduceCb, 0) : 0

    const discountInMoney = (discount * totalWithoutDiscount) / 100

    const totalWithoutToFixed = totalWithoutDiscount - discountInMoney

    const total = +totalWithoutToFixed.toFixed(2) || 0;



    const payload = {customer_id, discount, total, filteredItems}

    props.postInvoice(payload);

      // this.props.history.push("/invoices")
    };

    return (
      <form
        // onSubmit={this.handleSavingInvoice}
      >

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
                  {/*{total.toFixed(2) || 0}*/}
                </ListItemText>
              </ListItem>
            </List>

          </Paper>

          <Paper style={styles.rootRight}>
            <Typography variant="h6" align="center" gutterBottom style={styles.tableHeader}>Discount (%)</Typography>
            {/*DISCOUNT*/}
            <div>
              <Field
                name="discount"
                style={styles.numberFormControl}
                component={renderTextField}
                type='number'
                inputProps={{
                  min: 1,
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
  // }
}

const mapStateToProps =  state => {
  return {
    form: state.form.CreateForm,
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    postInvoice,
  }, dispatch);


export const InvoiceForm  = compose(
  reduxForm({
  form: 'CreateForm',
  // validate,
}),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(CreateForm)