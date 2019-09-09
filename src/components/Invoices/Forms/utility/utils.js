
export const calculateInvoiceItemPrice = (products, item) => {
  return products[item.product_id] && products[item.product_id].price * item.quantity
}

export const calculateInvoiceItemsTotal = (items, discount, products) => {
  const totalWithoutDiscount = items.reduce((acc, item) => {
    return acc + calculateInvoiceItemPrice(products, item)
  }, 0)

  const discountIntoMoney = (discount * totalWithoutDiscount) / 100
  const total = totalWithoutDiscount - discountIntoMoney
  const totalToFixed = +total.toFixed(2)

  return totalToFixed
}

export const makeItemsQuantityNumber = (items) => {
  return items.reduce((acc, item) => {
    return [...acc,
      {
        _id: item._id,
        quantity: +item.quantity,
        product_id: item.product_id
      }
    ]
  }, [])
}