<template>
  <div class="search-container mt-5 mb-5">
    <div class="search-header">
      <Logo />
    </div>
    <div class="search-body">
      <b-form-input
        v-model="profile"
        placeholder="Enter your name"
        size="lg"
      ></b-form-input>
      <Select />
      <b-button class="btn btn-dark" @click="searchData">Search</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profile: '',
    }
  },

  methods: {
    searchData() {
      const name = this.profile
      this.$router.push({ path: `/profile/${name}` })
    },
  },
}
</script>

<style scoped>
.search-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2em;
}

.search-header {
  display: flex;
  justify-content: center;
}

.search-body {
  display: flex;
  justify-content: center;
}

.search-img {
  max-width: 200px;
}

.select {
  width: 7em;
}
</style>
