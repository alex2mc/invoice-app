const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values /*, dispatch */) => {
  return sleep(1000).then(() => {
    // simulate server latency
    if (values.discount > 50 || values.discount < 0) {
      // eslint-disable-next-line no-throw-literal
      throw { discount: 'Discount is only from 0 to 50' }
    }
  })
};

export default asyncValidate