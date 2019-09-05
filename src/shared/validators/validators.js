export const isRequired = (value) => {
  console.log(value);
  return !value ? "Required" : null;
}

export const isMinValue0 = (value) => {
  return value < 0 ? "should be bigger" : null;
}

export const isDiscount = (value) => {
  if (value < 0) {
    return "should be at least 0"
  } else if (value > 50) {
    return "maximum 50"
  }
  return null;
}

export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
export const minValue0 = minValue(0)

export const maxValue = max => value =>
  value && value > max ? `Must be from 0 to ${max}` : undefined
export const maxValue50 = maxValue(50)