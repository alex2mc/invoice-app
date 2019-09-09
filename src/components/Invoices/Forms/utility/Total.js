import React from "react";
import { useSelector } from "react-redux";
import { getEntities as getProductsEntities } from "../../../../store/products/selectors";
import { calculateInvoiceItemsTotal } from "./utils";





const Total = ({ field, form: {values}, ...props}) => {

  const { items, discount} = values

  const productsEntities = useSelector(state => getProductsEntities(state))

  const filteredItems = items.filter(item => item.product_id)

  const total = calculateInvoiceItemsTotal(filteredItems, discount, productsEntities)

  return (
    <span>{isNaN(total) ? 0 : total}</span>
  )
}



export default Total;