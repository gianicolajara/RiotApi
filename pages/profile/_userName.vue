<template>
  <div class="profile-container">
    <div v-if="profile && profileIcon && times" class="banner-container">
      <Banner
        :profile="profile"
        :profileicon="profileIcon"
        :snippet="times"
        :wallpaper="mainChampion[0]"
      />
    </div>

    <div class="rankedCards-container mt-5 mb-5">
      <DisplaySmallCard
        v-for="(rankedinfo, index) in ranked"
        :key="index"
        :smallcarddata="rankedinfo"
        :title="rankedinfo.queueType"
      />
    </div>
    <div
      v-for="(matchData, index) in profileMatchesData"
      :key="index"
      class="card-large"
    >
      <div
        v-for="(participants, indexParticipant) in matchData.info.participants"
        :key="indexParticipant"
        class="card-large__header"
      >
        <div
          v-if="
            matchData.info.participants.indexOf(participants) ==
            matchData.metadata.meId
          "
        >
          <p class="text-white">{{ participants }}</p>
          <img
            :src="`http://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/${participants.championName}.png`"
            alt=""
          />
          {{ participants.summonerName }}
          {{ participants.assists }}
          {{ participants.deaths }}
          {{ participants.kills }}
          {{ participants.timePlayed / 60 }}
          {{ participants.win }}
          {{ participants.teamPosition }}
          {{
            (participants.assists + participants.kills) / participants.deaths
          }}
          {{ participants.champLevel }}
          {{ participants.championName }}
          {{ participants.visionScore }}
          {{ participants.visionScore }}

          <!-- p class="text-danger">
            {{ summonerCast.data[summonerCast[participants.summoner1Casts]] }}
          </p>
          <p class="text-success">
            {{ summonerCast.data[summonerCast[participants.summoner2Casts]] }}
          </p>
 -->
          <p class="text-danger">
            {{ summonerCast[participants.summoner1Id] }}
          </p>
          <p class="text-danger">
            {{ summonerCast[participants.summoner2Id] }}
          </p>

          <img :src="require(`@/assets/images/rankimages/bronze.png`)" alt="" />
        </div>
      </div>
      <div class="card-large__body"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { timeUtils } from '@/utils/times.js'
export default {
  data() {
    return {
      profileName: this.$route.params.userName,
      times: '',
    }
  },
  computed: {
    ...mapGetters({
      version: 'getVersion',
      profile: 'getProfile',
      ranked: 'getRanked',
      profileIcon: 'getProfileIcon',
      profileMatches: 'getProfileMatches',
      profileMatchesData: 'getProfileMatchesData',
      champions: 'getChampions',
      summonerCast: 'getSummonerCast',
      mainChampion: 'getMainChampion',
    }),
  },
  async mounted() {
    await this.serviceProfileData({ region: 'la1', profile: this.profileName })
    await this.serviceProfileRanked({ region: 'la1', id: this.profile.id })
    await this.serviceProfileIcon({ id: this.profile.profileIconId })
    await this.serviceProfileMatches({ puuid: this.profile.puuid })
    await this.serviceMatchesData({ list: this.profileMatches })
    this.times =
      'Last Profile Modify: ' +
      timeUtils.timeStampToDate(this.profile.revisionDate)
  },
  methods: {
    ...mapActions([
      'serviceProfileData',
      'serviceProfileRanked',
      'serviceProfileIcon',
      'serviceProfileMatches',
      'serviceMatchesData',
    ]),
  },
}
</script>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.rankedCards-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2em;
}

.banner-container {
  width: 100%;
}
</style>
