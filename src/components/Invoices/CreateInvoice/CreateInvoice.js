import React from 'react';
import InvoiceForm from '../Forms/InvoiceForm';

export default function CreateInvoice() {
  const initialValues = {discount: 0, customer_id: '', items: [{product_id: '', quantity: 1}] }
  return (
    <InvoiceForm initialValues={initialValues} />
  )
}