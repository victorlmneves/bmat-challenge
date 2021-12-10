import Address from '@/components/Address';
<template>
  <address>
    <!-- ---- {{address}} --- -->
    <p v-if="address.name2">{{ address.name2 }}</p>
    <p v-if="address.name3">{{ address.name3 }}</p>
    <p v-if="address.postalcode">{{ address.postalcode }}</p>
    <p v-if="address.city">{{ address.city }}</p>
    <p v-if="address.province">{{ address.province }}</p>
    <p v-if="address.stateCde">{{ address.stateCde }}</p>
    <p v-if="address.stateDesc">{{ address.stateDesc }}</p>
    <p v-if="address.countryCde">{{ address.countryCde }}</p>
    <p v-if="address.countryDesc">{{ address.countryDesc }}</p>
  </address>
</template>

<script>
export default {
  name: 'Address',

  props: {
    address: {
      type: Object,
      required: true
    }
  }
}
</script>
