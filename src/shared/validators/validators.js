export const required = (value) => {
  return !value ? "Required" : null;
}

export const isQuantity = (value) => {
  if(value <= 0) {
    return "Never happen"
  }
}

export const isDiscount = (value) => {
  if (value < 0) {
    return "Should be at least 0"
  } else if (value > 50) {
    return "Maximum 50"
  }
  return null;
}