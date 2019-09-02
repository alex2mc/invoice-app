import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, FieldArray } from 'redux-form';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography";

import ColorButtonGreen from "../../UI/Buttons/ColorButtonGreen";

import validate from '../../../shared/validate';

import InvoiceFormItems from "./InvoiceFormItems";
import { styles } from './styles';
import CustomerSelector from '../shared/CustomerSelector';
import { renderTextField } from "../shared/renderTextField";
import {bindActionCreators, compose} from "redux";
import { postInvoice } from "../../../store/invoices/actions";





  // handleSavingInvoice = (e) => {
  //   e.preventDefault();
  //
  //   const customer_id = this.props.myForm
  //     && this.props.myForm.values
  //     && this.props.myForm.values.customer_id;
  //
  //   const discount = this.props.myForm
  //   && this.props.myForm.values
  //   && this.props.myForm.values.discount
  //     ? +this.props.myForm.values.discount
  //     : 0;
  //   const total = this.props.total
  //   const items = this.props.myForm
  //   && this.props.myForm.values
  //   && this.props.myForm.values.items
  //     ? this.props.myForm.values.items
  //     : 'kill';
  //
  //   const filteredItems = items.filter(item => item.productName)
  //
  //   const reducedItems = filteredItems.reduce((acc, item) => {
  //     return [...acc,
  //       {
  //         quantity: +item.quantity,
  //         product_id: item.productName._id
  //       }
  //     ]
  //   }, [])
  //
  //   const payload = {customer_id, discount, total, reducedItems}
  //
  //   this.props.postInvoice(payload);
  //
  //   this.props.history.push("/invoices")
  // };


const CreateForm = ({ pristine, submitting, products, valid, total, ...props}) => {
  // const dispatch = useDispatch()
  console.log(props)
    return (
      <form
        // onSubmit={this.handleSavingInvoice}
      >

        {/*CUSTOMER NAME*/}
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
                products={products}
              />


              <ListItem>
                <ListItemText>Total</ListItemText>
                <ListItemText>
                  {total.toFixed(2) || 0}
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

        {/*BUTTON*/}
        <div style={styles.button}>
          <ColorButtonGreen
            type="submit"
            disabled={!valid || submitting || pristine}
            // onClick={this.handleSavingInvoice}
          >
            save invoice
          </ColorButtonGreen>
        </div>
      </form>
    )
  // }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    postInvoice,
  }, dispatch);


export const InvoiceForm  = compose(
  reduxForm({
  form: 'CreateForm',
  validate,
}),
  connect(
    null,
    mapDispatchToProps,
  ),
)(CreateForm)