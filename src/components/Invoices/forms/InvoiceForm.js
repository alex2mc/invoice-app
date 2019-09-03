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




const CreateForm = ({ pristine, submitting, valid,  form, total, customer_id, discount, items, ...props}) => {
  // const products = useSelector(state => getProducts(state));
  //
  // const [total, setTotal] = useState(0);
  // const [customer_id, setCustomer_id] = useState(null);
  // const [discount, setDiscount] = useState(0);
  // const [items, setItems] = useState([]);


  // const  handleChangingInvoice = () => {
    // e.preventDefault();

    // const customer_id = form.values.customer_id;
    // const discount = +form.values.discount || 0;

    // const filteredItems = form.values.items.filter(item => item.product_id);
    // const reducedItems = filteredItems.reduce((acc, item) => {
    //   return [...acc,
    //     {
    //       quantity: +item.quantity,
    //       product_id: item.product_id
    //     }
    //   ]
    // }, [])
    //
    // const totalReduceCb = (acc, it) =>
    //   acc + (((it.product_id && products[it.product_id].price) || 0) * (it.quantity || 1))
    // const totalWithoutDiscount = reducedItems ? reducedItems.reduce(totalReduceCb, 0) : 0
    // const discountInMoney = (discount * totalWithoutDiscount) / 100
    // const totalWithoutToFixed = totalWithoutDiscount - discountInMoney
    // const total = +totalWithoutToFixed.toFixed(2) || 0;
    //
    // setTotal(total);
    // setCustomer_id(customer_id);
    // setDiscount(discount);
    // setItems([
    //   // ...items,
    // reducedItems
    // ])

    // };
  //
  // console.log('ci', customer_id, 'd', discount, 't', total, items);
  //
  const  handleSavingInvoice = (e) => {
    e.preventDefault();

    const payload = {customer_id, discount, total, items}
    console.log('SI', payload);

    props.postInvoice(payload);

    props.history.push("/invoices")
  }

    return (
      <form
        // onSubmit={handleSavingInvoice} onChange={() => {console.log(123); handleChangingInvoice()}}
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
  // }
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
  }, [])

  const discount = (CreateForm && CreateForm.values && CreateForm.values.discount ? +CreateForm.values.discount : 0);

  const totalReduceCb = (acc, it) => {
    return acc + ((it && it.product_id && products && products[it.product_id] && +products[it.product_id].price)  * (+it.quantity || 1))}

  const totalWithoutDiscount = reducedItems ? reducedItems.reduce(totalReduceCb, 0) : 0

  const discountInMoney = (discount * totalWithoutDiscount) / 100
  const totalWithoutToFixed = totalWithoutDiscount - discountInMoney
  const total = +totalWithoutToFixed.toFixed(2) || 0;

  const customer_id = CreateForm && CreateForm.values && CreateForm.values.customer_id;

  return {
    form: state.form.CreateForm,
    products: getProducts(state),
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