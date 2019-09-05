import React from "react";
import {useSelector} from "react-redux";
import {getEntities as getProductsEntities} from "../../../../store/products/selectors";







const Total = ({ field, form: {values}, ...props}) => {
  console.log(values);
  const productsEntities = useSelector(state => getProductsEntities(state))

  const totalReduceCb = (acc, it) =>
    acc + ( productsEntities[it.product_name] && productsEntities[it.product_name].price * it.quantity)
  const totalWithoutDiscount = values.items.reduce(totalReduceCb, 0)

  console.log(totalWithoutDiscount);

  return (
    <span >

    </span>
  )
}



export default Total;