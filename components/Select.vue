<template>
  <b-form-select
    v-model="selected"
    :options="plataformHost"
    class="select"
    size="lg"
  >
  </b-form-select>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      selected: 'la1',
    }
  },
  computed: {
    ...mapState(['plataformHost']),
  },
}
</script>

<style lang="scss" scoped></style>
