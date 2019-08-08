<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg">
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  mounted () {
    this.$obyte.api.getWitnesses(function (err, result) {
      console.log(err, result)
    })
  }
}
</script>
