export default {
  state: {
    soundsList: [],
    soundsListAux: [],
    soundDetails: {}
  },

  getters: {
    soundsList: (state) => state.soundsList,

    soundsListAux: (state) => state.soundsListAux,

    soundDetails: (state) => state.soundDetails
  },

  mutations: {
    SET_SOUNDS_LIST (state, sounds) {
      localStorage.setItem('soundsList', JSON.stringify(sounds))
      state.soundsList = sounds
    },

    SET_AUX_SOUNDS_LIST (state, sounds) {
      localStorage.setItem('soundsListAux', JSON.stringify(sounds))
      state.soundsListAux = sounds
    },

    SET_SOUND_ITEM (state, sound) {
      localStorage.setItem('soundDetails', JSON.stringify(sound))
      state.soundDetails = sound
    },

    SET_SOUND_SORT (state, sounds) {
      localStorage.setItem('soundsListAux', JSON.stringify(sounds))
      state.soundsListAux = sounds
    }
  },

  actions: {
    async getAll ({ commit }) {
      const sounds = JSON.parse(localStorage.getItem('soundsList'))

      if (sounds && sounds.length !== 0) {
        commit('SET_SOUNDS_LIST', sounds)
        commit('SET_AUX_SOUNDS_LIST', sounds)

        return
      }

      try {
        const response = await fetch('mocks/sound-recordings-mock.json')
        const data = await response.json()

        commit('SET_SOUNDS_LIST', data)
        commit('SET_AUX_SOUNDS_LIST', data)
      } catch (error) {
        console.log('catch', error)
      }
    },

    async getById ({ commit, dispatch, state }, id) {
      let sounds = JSON.parse(localStorage.getItem('soundsList'))
      console.log('selectedSound', sounds)

      if (!sounds) {
        await dispatch('getAll')
        sounds = state.soundsList
      }

      const selectedSound = sounds.find(sound => sound.id === Number(id))

      commit('SET_SOUND_ITEM', selectedSound)
    },

    deleteById ({ commit }, id) {
      const sounds = JSON.parse(localStorage.getItem('soundsList'))

      const filteredSounds = sounds.filter(value => {
        return value.id !== id
      })

      commit('SET_SOUNDS_LIST', filteredSounds)
      commit('SET_AUX_SOUNDS_LIST', filteredSounds)
    },

    sortBY ({ commit }, option) {
      const sounds = JSON.parse(localStorage.getItem('soundsList'))
      const type = option.split(' ')[0]
      const order = option.split(' ').pop()

      if (type === 'default') {
        commit('SET_SOUND_SORT', sounds)
      }

      const sortedSounds = sounds.sort((a, b) => {
        console.log(type)
        if (type !== 'share') {
          return (order === 'asc') ? a[type].localeCompare(b[type]) : b[type].localeCompare(a[type])
        } else {
          return (order === 'asc') ? a[type] - b[type] : b[type] - a[type]
        }
      })

      commit('SET_SOUND_SORT', sortedSounds)
    },

    filterBY ({ commit }, text) {
      const sounds = JSON.parse(localStorage.getItem('soundsList'))
      const soundsAux = [...sounds]

      const soundsListAux = soundsAux.filter(sound => {
        return sound.iswc.toLowerCase().includes(text.toLowerCase()) ||
          sound.work_title.toLowerCase().includes(text.toLowerCase())
      })

      commit('SET_AUX_SOUNDS_LIST', soundsListAux)
    }
  }
}
