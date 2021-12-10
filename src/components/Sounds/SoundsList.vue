<template>
  <div class="sounds-list">
    <table class="sounds-list__table">
      <thead>
        <tr>
          <th scope="col">ISWC</th>
          <th scope="col">Work Title</th>
          <th class="sounds-list__shares" scope="col">Shares</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr class="sounds-list__rows" v-for="sound in soundList" :key="sound.id">
          <td>{{ sound.iswc }}</td>
          <td>{{ sound.work_title }}</td>
          <td class="sounds-list__shares">{{ sound.share }}</td>
          <td class="sounds-list__icon-wrapper">
            <router-link
              class="sounds-list__link"
              :to="{
                name: 'SoundDetails',
                params: {
                  id: sound.id
                }
              }"
            >
              <button class="sounds-list__details-btn">
                &#9654;
              </button>
            </router-link>
          </td>
          <td class="sounds-list__icon-wrapper">
            <button @click="deleteSound(sound.id)" class="sounds-list__delete-btn">
              &#10006;
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SoundsList',

  props: {
    soundList: Array
  },

  data () {
    return {
      sounds: []
    }
  },

  computed: {
    /**
     * @return {Array}
     */
    receivedSounds () {
      return this.soundList
    }
  },

  methods: {
    ...mapActions(['deleteById']),

    /**
     * Delete sound from the list
     * @param {number} id
     */
    deleteSound (id) {
      this.deleteById(id)
    }
  }
}
</script>

<style lang="scss" scoped>
.sounds-list {
  margin-top: $unit*4;
  padding: 0 $unit*4 $unit*6 $unit*4;
}

.sounds-list__table {
  border-bottom: 1px dashed $grey-light;
  border-top: 1px dashed $grey-light;
  border-collapse: collapse;
  box-shadow: 0 0 $unit*2 $grey-light;
  text-align: left;
  width: 100%;

  th,
  td {
    padding: $unit*4;
  }

  th {
    background: $brand-primary;
    color: $white;
  }
}

.sounds-list__info,
.sounds-list__icon-wrapper {
  text-align: center;
}

.sounds-list__icon-wrapper {
  width: 80px;
}

.sounds-list__rows {
  background: $selection-color;

  &:nth-of-type(odd) {
   background: $white;
  }
}

.sounds-list__shares {
  text-align: right;
}

.sounds-list__details-btn {
  background: $grey-lighter;
  border: none;
  border-radius: 4px;
  color: $white;
  font-style: unset;
  padding: $unit $unit*3;

  &:hover {
    background: $brand-primary;
    cursor: pointer;
    transition: background 0.5s ease-in-out;
  }
}

.sounds-list__delete-btn {
  border: none;
  border-radius: 4px;
  color: $danger;
  font-style: unset;
  padding: $unit $unit*3;

  &:hover {
    cursor: pointer;
  }
}
</style>
