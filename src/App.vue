<template>
  <div id="app">
    <MainHeader></MainHeader>
    <main>
      <Filters v-if="showFilters"></Filters>
      <router-view />
    </main>
  </div>
</template>

<script>
import MainHeader from './components/Base/MainHeader.vue'
import Filters from './components/Base/Filters.vue'

export default {
  name: 'App',

  components: {
    MainHeader,
    Filters
  },

  computed: {
    showFilters () {
      return this.$route.name === 'home'
    }
  }
}
</script>
