const validate = values => {
  const errors = {};
  if (!values.customerName) {
    errors.customerName = 'Required'
  }
  if (!values.productName) {
    errors.productName = 'Required'
  }
  if (!values.discount) {
    errors.discount = 'Required'
  }
  if (values.discount > 50 || values.discount < 0) {
    errors.discount = 'Discount is only from 0 to 50'
  }
  if (!values.quantity) {
    errors.quantity = 'Required'
  }
  if (values.quantity < 1 ) {
    errors.quantity = 'never happen'
  }
  return errors
};



export default validate