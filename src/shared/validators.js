export const required = value => (value ? undefined : 'Required')


// export const productValidation = (values) => {
//   console.log(values);
//   const { items } = values
//   let errorMessage = 'Please select product(s)'
//
//   if(!items || (items.length === 1 && !items[0].product_id)) {
//     return errorMessage
//   } else if(items.length > 1) {
//     errorMessage = ''
//     return errorMessage
//   }
// }

export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
export const minValue0 = minValue(0)

export const maxValue = max => value =>
  value && value > max ? `Must be from 0 to ${max}` : undefined
export const maxValue50 = maxValue(50)