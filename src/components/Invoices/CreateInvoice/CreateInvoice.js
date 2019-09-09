import React from 'react';
import InvoiceForm from '../Forms/InvoiceForm';
import { bindActionCreators } from "redux";
import { postInvoice } from "../../../store/invoices/actions";
import { connect } from "react-redux";

function CreateInvoice({...props}) {
  const initialValues = {discount: 0, customer_id: '', items: [{product_id: '', quantity: 1}] }
  return (
    <InvoiceForm initialValues={initialValues} buttonText={"save invoice"} action={postInvoice} {...props}/>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    postInvoice
  }, dispatch);

export default connect(null, mapDispatchToProps)(CreateInvoice);