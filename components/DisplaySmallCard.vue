<template>
  <div class="ranked-container">
    <SmallCard :rankdata="smallcarddata" :title="title" />
  </div>
</template>

<script>
export default {
  props: {
    smallcarddata: {
      type: Object,
      default: null,
    },
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
.ranked-container {
  display: flex;
  gap: 2em;
  flex-wrap: wrap;
}
</style>
