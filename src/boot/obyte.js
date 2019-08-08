import obyte from 'obyte'

export default ({ Vue }) => {
  let client
if (process.env.OBYTE_TESTNET_API) {
    client = new obyte.Client(process.env.OBYTE_TESTNET_API, { testnet: true })
  } else if (process.env.OBYTE_API) {
    client = new obyte.Client(process.env.OBYTE_API)
  } else {
    client = new obyte.Client()
  }
  Vue.prototype.$obyte = client
}
