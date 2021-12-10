<template>
  <SoundsList :soundList="soundsListAux" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SoundsList from '@/components/Sounds/SoundsList'

export default {
  components: {
    SoundsList
  },

  computed: {
    ...mapGetters(['soundsListAux'])
  },

  created () {
    this.getAll()
  },

  methods: {
    ...mapActions(['getAll'])
  }
}
</script>
