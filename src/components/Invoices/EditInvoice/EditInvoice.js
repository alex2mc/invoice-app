import React, { useEffect } from 'react';
import { bindActionCreators } from "redux";
import { getInvoice, getInvoiceItems, updateInvoice } from "../../../store/invoices/actions";
import { getCustomers } from "../../../store/customers/actions";
import { connect, useSelector } from "react-redux";
import { getEntities as getInvoicesEntities, getInvoiceItemsArray } from "../../../store/invoices/selectors";
import { getEntities as getCustomersEntities } from "../../../store/customers/selectors";
import InvoiceForm from "../Forms/InvoiceForm";
import Spinner from "../../UI/Spinner/Spinner";
import { makeItemsQuantityNumber } from "../Forms/utility/utils";

const EditInvoice = ({getInvoice, getInvoiceItems, getCustomers, ...props}) => {
  // console.log(props);

  useEffect(() => {
    getInvoice(props.match.params.id);
  }, [getInvoice, props.match.params.id]);

  useEffect(() => {
    getInvoiceItems(props.match.params.id);
  }, [getInvoiceItems, props.match.params.id]);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  const invoices = useSelector(state => getInvoicesEntities(state))
  const invoiceItems = useSelector(state => getInvoiceItemsArray(state))
  const customers = useSelector(state => getCustomersEntities(state))

  const reducedItems = makeItemsQuantityNumber(invoiceItems)
  const items = [...reducedItems, {product_id: '', quantity: 1}]

  console.log('items', items);

  const invoice = invoices[props.match.params.id]

  const discount = (invoice && invoice.discount) || 0
  const total = invoice && invoice.total
  const invoiceCustomer_id = invoice && invoice.customer_id

  const customer = customers[invoiceCustomer_id]
  const customer_id = customer && customer._id


  const initialValues = {discount, customer_id, items}


  if(!(customer_id && items && discount)) {
    return <Spinner />
  }

  return (
    <InvoiceForm initialValues={initialValues} total={total} buttonText={"Save changes"} action={updateInvoice} {...props}/>
  )
}


const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getInvoice,
    getInvoiceItems,
    getCustomers,
    updateInvoice
  }, dispatch);

export default connect(null, mapDispatchToProps)(EditInvoice);