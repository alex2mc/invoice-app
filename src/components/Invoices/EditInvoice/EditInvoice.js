import React, { useEffect } from 'react';
import { bindActionCreators } from "redux";
import { getInvoice, getInvoiceItems } from "../../../store/invoices/actions";
import { connect, useSelector } from "react-redux";
import { getEntities as getInvoicesEntities, getInvoiceItemsArray } from "../../../store/invoices/selectors";
import InvoiceForm from "../Forms/InvoiceForm";
import Spinner from "../../UI/Spinner/Spinner";
import {
  getIsGetInvoiceLoading,
  getIsGetInvoiceItemsLoading
} from "../../../store/invoices-requests/selectors";



const EditInvoice = ({getInvoice, getInvoiceItems, ...props}) => {

  useEffect(() => {
    getInvoice(props.match.params.id);
  }, [getInvoice, props.match.params.id]);

  useEffect(() => {
    getInvoiceItems(props.match.params.id);
  }, [getInvoiceItems, props.match.params.id]);


  const isInvoiceLoading = useSelector(state => getIsGetInvoiceLoading(state))
  const isInvoiceItemsLoading = useSelector(state => getIsGetInvoiceItemsLoading(state))

  const invoices = useSelector(state => getInvoicesEntities(state))
  const invoiceItems = useSelector(state => getInvoiceItemsArray(state))

  const items = [...invoiceItems, {product_id: '', quantity: 1}]

  const invoice = invoices[props.match.params.id]

  const discount = (invoice && invoice.discount) || 0

  const customer_id = invoice && invoice.customer_id


  const initialValues = {discount, customer_id, items}


  if(isInvoiceLoading || isInvoiceItemsLoading || !discount || !customer_id) {
    return <Spinner />
  }

  return (
    <InvoiceForm
      initialValues={initialValues}
      buttonText={"Save changes"}
      id={props.match.params.id}
      {...props}
    />
  )
}


const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getInvoice,
    getInvoiceItems,
  }, dispatch);

export default connect(null, mapDispatchToProps)(EditInvoice);