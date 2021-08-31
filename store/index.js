import axios from 'axios'

export const state = () => ({
  apiKey: '',
  version: [],
  summonerCast: [],
  plataformHost: [
    'br1',
    'eun1',
    'euw1',
    'jp1',
    'kr',
    'la1',
    'la2',
    'na1',
    'oc1',
    'tr1',
    'ru',
  ],
  profile: {},
  ranked: [],
  profileIcon: [],
  profileMatches: [],
  profileMatchesData: [],
  champions: [],
  mainChampion: [],
})

export const getters = {
  getVersion: (state) => {
    return state.version
  },
  getProfile: (state) => {
    return state.profile
  },
  getRanked: (state) => {
    return state.ranked
  },
  getProfileIcon: (state) => {
    return state.profileIcon
  },
  getProfileMatches: (state) => {
    return state.profileMatches
  },
  getProfileMatchesData: (state) => {
    return state.profileMatchesData
  },
  getChampions: (state) => {
    return state.champions
  },
  getSummonerCast: (state) => {
    return state.summonerCast
  },
  getMainChampion: (state) => {
    return state.mainChampion
  },
}

export const mutations = {
  SET_VERSION(state, versionData) {
    // eslint-disable-next-line no-console
    console.log('estoy mutando version')
    state.version = versionData
  },
  SET_PROFILE(state, profile) {
    // eslint-disable-next-line no-console
    console.log('estoy mutando profile')
    state.profile = profile
  },
  SET_RANKED(state, ranked) {
    // eslint-disable-next-line no-console
    console.log('estoy mutando ranked')
    if (ranked.length > 0) {
      state.ranked = ranked
      if (ranked.length === 1) {
        ranked[0].queueType === 'RANKED_SOLO_5x5'
          ? state.ranked.push({
              queueType: 'RANKED_FLEX_SR',
              tier: 'Unranked',
            })
          : state.ranked.push({
              queueType: 'RANKED_SOLO_5x5',
              tier: 'Unranked',
            })
      }
    } else {
      state.ranked = [
        {
          queueType: 'RANKED_FLEX_SR',
          tier: 'Unranked',
        },
        {
          queueType: 'RANKED_SOLO_5x5',
          tier: 'Unranked',
        },
      ]
    }
  },
  SET_PROFILEICON(state, icon) {
    // eslint-disable-next-line no-console
    console.log('estoy mutando profile icon')
    state.profileIcon = icon
  },
  SET_PROFILEMATCHES(state, matches) {
    // eslint-disable-next-line no-console
    console.log('estoy mutando profile matches')
    state.profileMatches = matches
  },
  SET_CHAMPIONS(state, champions) {
    // eslint-disable-next-line no-console
    console.log('estoy mutando champions')
    state.champions = champions.data
  },
  SET_SUMMONERCAST(state, summoner) {
    state.summonerCast = summoner
  },
  SET_PROFILEMATCHDATAVOID(state) {
    state.profileMatchesData = []
  },
  SET_PROFILEMATCHDATA(state, listMatchData) {
    state.profileMatchesData.push(listMatchData)
    state.profileMatchesData.forEach((item) => {
      const idMatch = item.metadata.participants.indexOf(state.profile.puuid)
      item.metadata.meId = idMatch
    })
  },
  SET_CHAMPIONMAIN(state, match) {
    const champName = match.info.participants[match.metadata.meId].championName
    state.mainChampion.push(champName)
  },

  SET_CHAMPMAINVOID(state) {
    state.mainChampion = []
  },
}

export const actions = {
  async serviceVersion({ commit }) {
    const res = await axios.get(
      'https://ddragon.leagueoflegends.com/api/versions.json'
    )
    commit('SET_VERSION', res.data[0])
  },

  async serviceProfileData({ commit }, { region, profile }) {
    const res = await axios.get(
      `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${profile}?api_key=${this.state.apiKey}`
    )
    commit('SET_PROFILE', res.data)
  },

  async serviceProfileRanked({ commit }, { region, id }) {
    const res = await axios.get(
      `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${this.state.apiKey}`
    )
    commit('SET_RANKED', res.data)
  },

  async serviceProfileIcon({ commit }, { id }) {
    const res = await axios.get(
      `http://ddragon.leagueoflegends.com/cdn/11.16.1/data/en_US/profileicon.json`
    )
    commit('SET_PROFILEICON', res.data.data[id])
  },

  async serviceProfileMatches({ commit }, { puuid }) {
    const res = await axios.get(
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=3&api_key=${this.state.apiKey}`
    )
    commit('SET_PROFILEMATCHES', res.data)
  },

  async serviceChamps({ commit }) {
    const res = await axios.get(
      `http://ddragon.leagueoflegends.com/cdn/11.16.1/data/en_US/champion.json`
    )
    // eslint-disable-next-line no-console
    console.log()
    commit('SET_CHAMPIONS', res.data)
  },

  async serviceSummonerCast({ commit }) {
    const lista = {}
    const res = await axios.get(
      `http://ddragon.leagueoflegends.com/cdn/11.16.1/data/en_US/summoner.json`
    )

    Object.values(res.data.data).forEach((item) => {
      lista[item.key] = item
    })

    commit('SET_SUMMONERCAST', lista)
  },

  serviceMatchesData({ commit }) {
    commit('SET_PROFILEMATCHDATAVOID')
    commit('SET_CHAMPMAINVOID')
    this.state.profileMatches.forEach(async (match) => {
      const res = await axios.get(
        `https://americas.api.riotgames.com/lol/match/v5/matches/${match}?api_key=${this.state.apiKey}`
      )
      await commit('SET_PROFILEMATCHDATA', res.data)
      await commit('SET_CHAMPIONMAIN', res.data)
    })
  },
}
