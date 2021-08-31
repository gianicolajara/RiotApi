<template>
  <div
    v-if="profileicon.image"
    class="profile__header"
    :style="{
      backgroundImage: `url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${wallpaper}_0.jpg)`,
    }"
  >
    <div class="profile__icon">
      <img
        :src="`http://ddragon.leagueoflegends.com/cdn/11.16.1/img/profileicon/${profileicon.image.full}`"
        alt="profile leagueoflegends"
        class="profile__img"
      />
    </div>
    <div class="profile__body mt-3">
      <h3 class="profile__title text-white pt-2">
        {{ profile.name }}
      </h3>
      <h5 class="text-white">Lvl. {{ profile.summonerLevel }}</h5>
      <small class="text-white">{{ snippet }}</small>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      default: null,
    },
    profileicon: {
      type: Object,
      default: null,
    },
    snippet: {
      type: String,
      default: null,
    },
    wallpaper: {
      type: String,
      default: 'Teemo',
    },
  },
}
</script>

<style scoped>
.profile__body {
  text-align: center;
}

.profile__header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 25em;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.profile__icon {
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 1em;
  border: 0.5em solid white;
}

.profile__img {
  width: 100%;
}

.profile__title {
  font-weight: 700;
}
</style>
