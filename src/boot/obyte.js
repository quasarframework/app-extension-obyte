import obyte from 'obyte'
import Mnemonic from 'bitcore-mnemonic'

export default ({ Vue }) => {
  let client
  if (process.env.OBYTE_API) {
    client = new obyte.Client(process.env.OBYTE_API)
  } else if (process.env.OBYTE_TESTNET_API) {
    client = new obyte.Client(process.env.OBYTE_TESTNET_API, { testnet: true })
  } else {
    client = new obyte.Client()
  }
  Vue.prototype.$obyte = client
  Vue.prototype.$Mnemonic = Mnemonic
}
