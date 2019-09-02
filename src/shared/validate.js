const validate = values => {
  const errors = {};
  errors.items = []

  const productValidation = () => {
    const { items } = values
    let errorMessage = 'Please select product(s)'

    if(!items || (items.length === 1 && !items[0].productName)) {
      return errorMessage
    } else if(items.length > 1) {
      errorMessage = ''
      return errorMessage
    }
  }

  const productValidationMessage = productValidation()

  if (!values.customerName) {
    errors.customerName = 'Required'
  }
  if (productValidationMessage) {
    errors.items.push({productName: productValidationMessage})
  }
  if (values.discount > 50 || values.discount < 0) {
    errors.discount = 'Discount is only from 0 to 50'
  }

  // if (!values.quantity) {
  //   errors.quantity = 'Required'
  // }
  // if (values.quantity < 1 ) {
  //   errors.quantity = 'never happen'
  // }
  // console.log('errors', errors);
  return errors
};



export default validate