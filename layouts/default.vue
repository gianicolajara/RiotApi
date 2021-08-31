<template>
  <div class="app">
    <Nav />
    <div class="container-app">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import { utilsLocalStorage } from '@/utils/localStorage.js'

export default {
  computed: {
    ...mapState(['champions', 'summonerCast']),
  },
  mounted() {
    const init = [
      {
        itemName: 'champions',
        item: this.getChampions,
        getItem: this.serviceChamps,
        setItem: this.SET_CHAMPIONS,
      },
      {
        itemName: 'summonerCast',
        item: this.getSummonerCast,
        getItem: this.serviceSummonerCast,
        setItem: this.SET_SUMMONERCAST,
      },
      {
        itemName: 'version',
        item: this.getVersion,
        getItem: this.serviceVersion,
        setItem: this.SET_VERSION,
      },
    ]

    init.forEach(async (item) => {
      await utilsLocalStorage.verifyItemAndCreateLocalStorage(
        item.itemName,
        item.item,
        item.getItem,
        item.setItem
      )
    })
  },
  methods: {
    ...mapActions(['serviceChamps', 'serviceSummonerCast', 'serviceVersion']),
    ...mapMutations(['SET_CHAMPIONS', 'SET_SUMMONERCAST', 'SET_VERSION']),
    ...mapGetters(['getChampions', 'getSummonerCast', 'getVersion']),
  },
}
</script>

<style scoped>
.app {
  background-color: #4b4f51;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.container-app {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  width: 100%;
}
</style>
