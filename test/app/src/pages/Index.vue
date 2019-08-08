<template>
  <q-page class="flex flex-center">
    <h4 class="text-weight-thin q-mr-lg">Witnesses</h4>
    <pre>
      <li v-for="(witness, index) in witnesses" :key="index"> {{ witness }}</li>
    </pre>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      witnesses: ['loading']
    }
  },
  mounted () {
    this.$obyte.api.getWitnesses(async (err, result) => {
      console.log(err, result)
      this.witnesses = await result
    })
  }
}
</script>
