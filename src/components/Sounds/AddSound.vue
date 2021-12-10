<template>
  <div class="add-item">
    <div v-if="showSuccessMsg" class="add-item__success">
      <p>Sound added successfully!!!</p>
      <button class="add-item__close-btn" @click="closeMessage()">&#10006;</button>
    </div>
    <form class="add-item__form">
      <div class="add-item__row">
        <div class="add-item__form-group">
          <label for="iswc">ISWC</label>
          <input ref="iswcInput" @blur="hideErrorMsg($event)" required name="iswc" v-model='sound.iswc' type="text" class="add-item__input">
          <p ref="iswcError" class="add-item__error">Please enter the ISWC</p>
        </div>

        <div class="add-item__form-group">
          <label for="work_title">Work Title</label>
          <input
            ref="workTitleInput"
            required
            name="work_title"
            v-model='sound.work_title'
            type="text"
            class="add-item__input"
          >
          <p ref="workTitleError" class="add-item__error">Please enter the Work Title</p>
        </div>
      </div>

      <div class="add-item__row">
        <div class="add-item__form-group">
          <label for="titles">
            Other Titles
            <i class="add-item__info-icon" title="To add multipe titles use semilocon to separete each title">
              &#8505;
            </i>
          </label>
          <input
            required
            name="titles"
            v-model='sound.titles'
            type="text"
            class="add-item__input"
            placeholder="Ex: Love You; Love You & Me"
          />
        </div>
      </div>

      <div v-for="(sound, index) in sound.interested_parties" :key="index">
        <div class="add-item__clone">
          <h5>Interested Parties</h5>
          <i @click="cloneFormBlock()" class="add-item__clone-btn" title="To add more Interested Parties click on the button">
            &#43;
          </i>
        </div>
        <div class="add-item__row">
          <div class="add-item__form-group">
            <label for="full_name">Full Name</label>
            <input name="full_name" v-model='sound.full_name' type="text" class="add-item__input">
          </div>

          <div class="add-item__form-group">
            <label for="ipi_na_num">IPI Number</label>
            <input name="ipi_na_num" v-model='sound.ipi_na_num' type="text" class="add-item__input">
          </div>
        </div>

        <div class="add-item__row">
          <div class="add-item__form-group">
            <label for="role">Role</label>
            <input name="role" v-model='sound.role' type="text" class="add-item__input">
          </div>
          <div class="add-item__form-group"></div>
        </div>

        <h5>Address</h5>
        <div v-for="(address, index) in sound.address" :key="index">
          <div class="add-item__row">
            <div class="add-item__form-group">
              <label for="name2">Name 2</label>
              <input name="name2" v-model='address.name2' type="text" class="add-item__input">
            </div>

            <div class="add-item__form-group">
              <label for="name3">Name 3</label>
              <input name="name3" v-model='address.name3' type="text" class="add-item__input">
            </div>
          </div>

          <div class="add-item__row">
            <div class="add-item__form-group">
              <label for="line1">Line 1</label>
              <input name="line1" v-model='address.line1' type="text" class="add-item__input">
            </div>

            <div class="add-item__form-group">
              <label for="line2">Line 2</label>
              <input name="line2" v-model='address.line2' type="text" class="add-item__input">
            </div>
          </div>

          <div class="add-item__row">
            <div class="add-item__form-group">
              <label for="postalCde">Postal Code</label>
              <input name="postalCde" v-model='address.postalCde' type="text" class="add-item__input">
            </div>

            <div class="add-item__form-group">
              <label for="city">City</label>
              <input name="city" v-model='address.city' type="text" class="add-item__input">
            </div>

            <div class="add-item__form-group">
              <label for="province">Province</label>
              <input name="province" v-model='address.province' type="text" class="add-item__input">
            </div>
          </div>

          <div class="add-item__row">
            <div class="add-item__form-group">
              <label for="stateCde">State Code</label>
              <input name="stateCde" v-model='address.stateCde' type="text" class="add-item__input"
              />
            </div>

            <div class="add-item__form-group">
              <label for="countryCde">Country Code</label>
              <input name="countryCde" v-model='address.countryCde' type="text" class="add-item__input">
            </div>
          </div>

          <div class="add-item__row">
            <div class="add-item__form-group">
              <label for="stateDesc">State Description</label>
              <textarea
                name="stateDesc"
                v-model='address.stateDesc'
                class="add-item__input add-item__input--textarea"
              ></textarea>
            </div>

            <div class="add-item__form-group">
              <label for="countryDesc">Country Description</label>
              <textarea
                name="countryDesc"
                v-model='address.countryDesc'
                class="add-item__input add-item__input--textarea"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div class="add-item__row">
        <div class="add-item__form-group">
          <button
            v-if="isSending"
            type="button"
            class="add-item__button add-item__button--disabled"
          >
            Sending...
          </button>
          <button
            v-else
            type="button"
            class="add-item__button"
            @click="onSubmit"
          >
            Add Sound
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sound: {
        iswc: '',
        titles: [],
        work_title: '',
        interested_parties: [
          {
            full_name: '',
            ipi_na_num: '',
            role: '',
            address: [{
              name2: '',
              name3: '',
              line1: '',
              line2: '',
              postalCde: '',
              city: '',
              province: '',
              stateCde: '',
              countryCde: '',
              stateDesc: '',
              countryDesc: ''
            }]
          }
        ],
        share: 0
      },
      isSending: false,
      showSuccessMsg: false
    }
  },

  methods: {
    clearForm () {
      this.sound = {
        id: null,
        iswc: '',
        titles: [],
        work_title: '',
        interested_parties: [
          {
            full_name: '',
            ipi_na_num: '',
            role: '',
            address: [{
              name2: '',
              name3: '',
              line1: '',
              line2: '',
              postalCde: '',
              city: '',
              province: '',
              stateCde: '',
              countryCde: '',
              stateDesc: '',
              countryDesc: ''
            }]
          }
        ],
        share: 0
      }
    },

    cloneFormBlock () {
      this.sound.interested_parties.push({
        full_name: '',
        ipi_na_num: '',
        role: '',
        address: [{
          name2: '',
          name3: '',
          line1: '',
          line2: '',
          postalCde: '',
          city: '',
          province: '',
          stateCde: '',
          countryCde: '',
          stateDesc: '',
          countryDesc: ''
        }]
      })
    },

    onSubmit () {
      this.isSending = true

      // eslint-disable-next-line camelcase
      let { iswc, titles, work_title } = this.sound

      if (!iswc) {
        this.isSending = false
        const iswcError = this.$refs.iswcError
        const iswcInput = this.$refs.iswcInput

        iswcError.classList.add('add-item__error--visible')
        iswcInput.focus()

        return
      }

      // eslint-disable-next-line camelcase
      if (!work_title) {
        this.isSending = false
        const workTitleError = this.$refs.workTitleError
        const workTitleInput = this.$refs.workTitleInput

        workTitleError.classList.add('add-item__error--visible')
        workTitleInput.focus()

        return
      }

      titles = titles.length > 0 ? titles.split(';') : []

      const formData = this.sound
      formData.titles = titles

      const sounds = JSON.parse(localStorage.getItem('soundsList'))
      formData.id = sounds.length + 1
      sounds.push(formData)

      localStorage.setItem('soundsList', JSON.stringify(sounds))
      localStorage.setItem('soundsListAux', JSON.stringify(sounds))

      this.clearForm()

      setTimeout(() => {
        this.isSending = false

        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }, 1000)

      this.showSuccessMsg = true

      // if using an external API endoint
      // this.$http.post('/api/sounds', formData)
      //   .then(response => {
      //     this.isSending = false
      //     this.showSuccessMsg = true
      //     this.clearForm()
      //   })
      //   .catch(error => {
      //     this.isSending = false
      //     console.log(error)
      //   })
    },

    closeMessage () {
      this.showSuccessMsg = false
    },

    hideErrorMsg (event) {
      console.log(event)
      const error = event.target.nextElementSibling
      error.classList.remove('add-item__error--visible')
    }
  }
}
</script>

<style lang="scss" scoped>
.add-item {
  margin: 0 auto;
  width: 60%;
}

.add-item__row {
  display: flex;
  flex: 1;
  flex-wrap: nowrap;
  grid-gap: 30px;
  justify-content: space-between;
}

.add-item__form-group {
  margin: 0 auto $unit*5;
  width: 100%;

  label {
    position: relative;
  }
}

.add-item__input {
  border: 1px solid rgb(218, 218, 218);
  color: $grey;
  display: inline-block;
  height: $unit*9;
  padding: $unit*2;
  vertical-align: middle;
  width: 100%;

  &:focus {
    border-color: $brand-primary;
    outline: 0;
  }

  &--textarea {
    border-color: rgb(218, 218, 218);
    height: 160px;
  }
}

.add-item__error {
  display: none;
  color: $danger;
  font-size: 12px;

  &--visible {
    display: block;
  }
}

.add-item__button {
  background: $black;
  color: $white;
  border: none;
  padding: $unit*4;
  text-transform: uppercase;
  width: 100%;

  &:hover {
    background: $brand-primary;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
  }

  &--disabled {
    background: $grey-light;
    color: $white;
    pointer-events : none;
  }
}

.add-item__info-icon {
  background: $brand-primary;
  border-radius: 50%;
  color: $white;
  display: inline-block;
  font-size: 10px;
  height: 16px;
  line-height: 1.5;
  position: absolute;
  text-align: center;
  transform: translate(30%, -30%);
  width: 16px;

  &:hover {
    cursor: pointer;
  }
}

.add-item__clone {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.add-item__clone-btn {
  background: $brand-primary;
  border-radius: 6px;
  color: $white;
  display: inline-block;
  font-style: normal;
  font-size: 24px;
  font-weight: $font-weight-bold;
  height: 26px;
  line-height: 1.2;
  text-align: center;
  width: 26px;

  &:hover {
    cursor: pointer;
  }
}

.add-item__success {
  align-items: center;
  background: $info;
  color: $white;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-bottom: $unit*10;
  padding: 0 $unit*5;
}

.add-item__success--show {
  display: flex;
}

.add-item__close-btn {
  background: $white;
  border: 0;
  border-radius: 4px;
  color: $grey;
  font-style: unset;
  height: $unit*8;
  padding: 0 $unit*3;

  &:hover {
    cursor: pointer;
  }
}
</style>
