<template>
  <q-page>
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="witnesses" label="Witnesses" />
      <q-tab name="walletAddress" label="Wallet addr" />
      <q-tab name="balance" label="Balance" />
      <q-tab name="transfer" label="Transfer" />
    </q-tabs>
    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="witnesses" class="flex flex-center">
        <q-card>
          <q-card-actions>
            <q-btn
              color="primary"
              @click="loadWitnesses"
            >
              Refresh list
            </q-btn>
          </q-card-actions>
          <q-card-section>
            <q-list>
              <q-item v-for="(witness, index) in witnesses" :key="index">
                <q-item-section>
                  {{ witness }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-tab-panel>
      <q-tab-panel name="walletAddress" class="flex flex-center">
        <q-card>
          <q-card-section>
            <pre>
              {{ addressInformation }}
            </pre>
          </q-card-section>
          <q-card-actions>
            <q-btn
              color="primary"
              @click="generateNewAddress"
              :loading="loading"
            >
              Generate new address
            </q-btn>
          </q-card-actions>
        </q-card>
      </q-tab-panel>
      <q-tab-panel name="balance" class="flex flex-center">
        <q-card>
          <q-card-section>
            <q-input
              v-model="wallet.address"
              label="Address"
            />
          </q-card-section>
          <q-card-actions>
            <q-btn
              color="primary"
              @click="getWalletBalance"
              :loading="loading"
            >
              Request wallet balance
            </q-btn>
          </q-card-actions>
          <q-card-section v-if="wallet.balance">
            <pre>
              {{ wallet.balance }}
            </pre>
          </q-card-section>
        </q-card>
      </q-tab-panel>
      <q-tab-panel name="transfer">
        <q-card>
          <q-card-section>
            <q-input
              v-model="transfer.address"
              type="text"
              label="Payment address"
            />
            <q-input
              v-model="transfer.amount"
              type="number"
              label="Amount"
            />
            <q-input
              v-model="transfer.wif"
              type="text"
              label="WIF"
            />
          </q-card-section>
          <q-card-actions>
            <q-btn
              color="primary"
              @click="transferAssets"
            >
              Send payment
            </q-btn>
          </q-card-actions>
        </q-card>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<style>
</style>

<script>
import { toWif, getChash160 } from 'obyte/lib/utils'
import Mnemonic from 'bitcore-mnemonic'

const testnet = true // Change to "true" to generate testnet wallet
const path = testnet ? "m/44'/1'/0'/0/0" : "m/44'/0'/0'/0/0"

export default {
  name: 'PageIndex',
  data () {
    return {
      tab: 'witnesses',
      witnesses: ['loading'],
      addressInformation: 'Click on the button to generate a new wallet',
      loading: false,
      wallet: {
        address: null,
        balance: null
      },
      transfer: {
        address: null,
        amount: null,
        wif: null
      }
    }
  },
  watch: {
    tab: {
      immediate: true,
      async handler (val) {
        if (val === 'witnesses') {
          await this.loadWitnesses()
        }
      }
    }
  },
  methods: {
    async loadWitnesses () {
      this.witnesses = ['loading']
      this.witnesses = await this.$obyte.api.getWitnesses()
    },
    generateNewAddress () {
      this.loading = true
      let mnemonic = new Mnemonic()
      while (!Mnemonic.isValid(mnemonic.toString())) {
        mnemonic = new Mnemonic()
      }
      const xPrivKey = mnemonic.toHDPrivateKey()
      const { privateKey } = xPrivKey.derive(path)
      const privKeyBuf = privateKey.bn.toBuffer({ size: 32 })
      const wif = toWif(privKeyBuf, testnet)
      const pubkey = privateKey.publicKey.toBuffer().toString('base64')
      const definition = ['sig', { pubkey }]
      const address = getChash160(definition)
      this.loading = false

      this.addressInformation = `
        \nSeed: ${mnemonic.phrase}
        \nPath:${path}
        \nWIF: ${wif},
        \nPublic key: ${pubkey}
        \nAddress: ${address}
        `
    },
    async getWalletBalance () {
      if (this.wallet.address) {
        this.wallet.balance = null
        this.loading = true
        const result = await this.$obyte.api.getBalances([this.wallet.address])
        if (result && result[this.wallet.address]) {
          this.wallet.balance = result[this.wallet.address].base
        }
        this.loading = false
      }
    },
    async transferAssets () {
      const res = await this.$obyte.post.payment(
        [
          {
            address: this.transfer.address,
            amount: this.transfer.amount
          }
        ],
        this.transfer.wif
      )
      console.log(res)
    }
  }
}
</script>
