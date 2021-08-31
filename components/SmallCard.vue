<template>
  <div class="card-small bg-dark p-3">
    <div class="card-small__header">
      <p class="text-gray text-center">{{ title }}</p>
      <img
        :src="
          require(`@/assets/images/rankimages/${rankdata.tier.toLowerCase()}.png`)
        "
        alt=""
        class="card-small__img"
      />
    </div>
    <!-- {{ rankdata }} -->
    <div class="card-small__body">
      <p class="text-gray">
        <span v-if="rankdata.tier"
          >{{ rankdata.tier[0]
          }}{{ rankdata.tier.toLowerCase().slice(1) }}</span
        >
        <span v-if="rankdata.rank">{{ rankdata.rank }}</span>
      </p>
      <p v-if="rankdata.leaguePoints" class="text-gray">
        {{ rankdata.leaguePoints }} LP
      </p>
      <p v-if="rankdata.wins && rankdata.losses" class="text-gray">
        <span class="text-success">{{ rankdata.wins }} W</span> /
        <span class="text-danger">{{ rankdata.losses }} L</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rankdata: {
      type: Object,
      default: null,
    },
    title: {
      type: String,
      default: 'Title',
    },
  },
}
</script>

<style scoped>
.card-small {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.5em;
}

.card-small__header {
  width: 200px;
}

.card-small__img {
  width: 100%;
}
.text-gray {
  color: #80888c;
}
.card-small__body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.card-small__body p {
  margin: 0;
}
</style>
