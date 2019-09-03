import React from 'react';
import { InvoiceForm } from '../forms/InvoiceForm';

import Paper from '@material-ui/core/Paper';
import { styles } from '../shared/styles';



export default function CreateInvoice() {

  return (
    <Paper style={styles.wrapper}>
      <InvoiceForm/>
    </Paper>
  )
}

