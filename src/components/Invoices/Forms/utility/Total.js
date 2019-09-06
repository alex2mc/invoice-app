import React from "react";
import { useSelector } from "react-redux";
import { getEntities as getProductsEntities } from "../../../../store/products/selectors";
// import TextField from '@material-ui/core/TextField';





const Total = ({ field, form: {values}, ...props}) => {
  const productsEntities = useSelector(state => getProductsEntities(state))

  const totalReduceCb = (acc, it) =>
    acc + ((( productsEntities[it.product_name] && productsEntities[it.product_name].price) || 0) * it.quantity)
  const totalWithoutDiscount = values.items.reduce(totalReduceCb, 0)

  const discount = values.discount;

  const discountIntoMoney = (discount * totalWithoutDiscount) / 100
  const total = totalWithoutDiscount - discountIntoMoney
  const totalToFixed = total.toFixed(2)

  return (
    <span>{totalToFixed}</span>
      // <TextField
      //   {...field}
      //   id={field.name}
      //   margin="normal"
      //   value={total}
      // />
  )
}



export default Total;