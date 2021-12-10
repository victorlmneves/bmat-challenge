<template>
  <div class="sound">
    <div v-if="soundDetails" class="sound__item">
      <h3 class="sound__title">
        <router-link to="/">
          <i class="sound__back-btn">&#8668;</i>
        </router-link>
        ISWC: <span>{{soundDetails.iswc}}</span>
      </h3>
      <div class="sound__ctn-wrapper">
        <div class="sound__container">
          <h5>Work Title</h5>
          <p class="sound__info">{{soundDetails.work_title}}</p>
          <template v-if="soundDetails.titles.length">
            <h5>Other Title(s)</h5>
            <p v-for="(title, index) in soundDetails.titles" :key="index" class="sound__info">{{ title }}</p>
          </template>
          <h5>Share</h5>
          <p class="sound__info">{{soundDetails.share}}</p>
        </div>
        <div class="sound__container">
          <template v-if="soundDetails.interested_parties.length">
            <h5 class="sound__subtitle">Interested Parties</h5>
            <div class="sound__parties" v-for="parties in soundDetails.interested_parties" :key="parties.ipi_na_nu" >
              <p class="sound__info" v-if="parties.full_name">
                <span class="sound__label">Name: </span>
                {{ parties.full_name }}
                </p>
              <p class="sound__info" v-if="parties.ipi_na_num">
                <span class="sound__label">IPI: </span>
                {{ parties.ipi_na_num }}
              </p>
              <p class="sound__info" v-if="parties.role">
                <span class="sound__label">Role: </span>
                {{ parties.role }}
              </p>
              <template v-if="parties.address">
                <h5 :key="parties.ipi_na_num" class="sound__subtitle">Address</h5>
                <template v-for="(address, index) in parties.address">
                  <Address :address="address" :key="index"></Address>
                </template>
              </template>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Address from '@/components/Address'

export default {
  name: 'SoundDetails',

  components: { Address },

  data () {
    return {
      itemId: null
    }
  },

  computed: {
    ...mapGetters(['soundDetails'])
  },

  mounted () {
    setTimeout(() => {
      window.scrollTo({
        top: 100,
        behavior: 'smooth'
      })
    }, 2000)
  },

  created () {
    this.itemId = this.$route.params.id
    this.getById(this.itemId)
  },

  methods: {
    ...mapActions(['getById'])
  }
}
</script>

<style lang="scss" scoped>
.sound {
  padding: 0 $unit*2 $unit*6 $unit*2;

  h5 {
    margin-bottom: $unit;
  }

  p {
    margin-bottom: $unit*2;
    margin-top: $unit*2;
  }
}

.sound__title {
  border: 1px solid $grey;
  margin-bottom: $unit*8;
  overflow: hidden;
  padding: $unit*3 $unit*8 $unit*3 $unit*20;
  position: relative;

  span {
    font-size: 1rem;
    font-weight: $font-weight-light;
  }
}

.sound__subtitle {
  border-bottom: 1px solid $grey;
  color: $brand-primary;
  padding: $unit*2 0;
}

.sound__ctn-wrapper {
  align-self: start;
  display: flex;
  gap: 30px;
  justify-content: space-between;
}

.sound__container {
  border: 1px solid $grey;
  padding: $unit*3 $unit*8;
  width: 50%;
}

.sound__item {
  padding: 0 $unit*5;
}

.sound__back-btn {
  background: $grey;
  font-size: $unit*8;
  font-style: normal;
  left: -$unit*3;
  padding-left: $unit*6;
  position: absolute;
  top: 0;
  transform: skewX(-20deg);
  width: $unit*20;
}

.sound__name {
  font-size: $unit*8;
  line-height: 1.2;
  margin-bottom: $unit*3;
}

.sound__parties:not(:last-child) {
  border-bottom: 1px solid $border;
}

.sound__label {
  font-size: 12px;
  font-weight: $font-weight-bold;
}
</style>
