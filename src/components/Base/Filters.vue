<template>
  <div class="filters">
    <div class="filters__wrap">
      <router-link class="filters__add-item" to="/add-sound">
        Add Sound
      </router-link>
    </div>
    <div class="filters__wrap">
      <input
        class="filters__search"
        type="text"
        placeholder="search..."
        name="filter"
        v-model="search"
        @keyup="filter($event)"
      >
    </div>
    <div class="filters__wrap">
      <label class="filters__label" for="filters">Sort by</label>
      <select class="filters__select" name="filters" @change="sort($event)">
        <option value="default">Default</option>
        <option value="iswc asc">ISWC ↑</option>
        <option value="iswc desc">ISWC ↓</option>
        <option value="work_title asc">Title ↑</option>
        <option value="work_title desc">Title ↓</option>
        <option value="share asc">Shares ↑</option>
        <option value="share desc">Shares ↓</option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      search: ''
    }
  },

  methods: {
    ...mapActions(['sortBY', 'filterBY']),

    sort (event) {
      this.sortBY(event.target.value)
    },

    filter (event) {
      this.filterBY(event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.filters {
  align-items: center;
  display: flex;
  padding: 0 $unit*4 $unit*4;
}

.filters__wrap {
  align-self: auto;
  flex: 0 1 auto;
  order: 0;

  &:first-child {
    flex: 1 1 auto;
    text-align: left;
  }

  &:not(:last-child) {
    margin-right: $unit*6;
  }
}

.filters__label {
  padding-right: $unit*2;
}

.filters__search,
.filters__select {
  border: 0;
  border-radius: 4px;
  box-shadow: 0 0 $unit $unit/4 rgba(8, 6, 6, 0.1) inset;
  padding: $unit*3 $unit*5;
}
</style>
