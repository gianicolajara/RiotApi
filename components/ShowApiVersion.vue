<template>
  <div>
    <p class="text-secondary text-center">Versión {{ getVersion[0] }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getVersion']),
  },
}
</script>

<style scoped></style>
