import { Planet } from '@/models/planetModel'
import { PlanetService } from '@/services/planetService'

const planetService = new PlanetService();

const state = () => ({
  allPlanets: [],
  planetDetails: {},
  planetCount: 0
})

const getters = {
  getPlanets: (state) => {
    return state.allPlanets
  },
  getPlanetDetails: (state) => {
    return state.planetDetails
  },
  getPlanetsCount: (state) => {
    return state.planetCount
  },
}

const actions = {
  async fetchAllPlanets ({ commit }) {
    const response = await planetService.getPlanets()
    commit('setPlanets', response.results)
    commit('setPlanetsCount', response.count)
  },
  async fetchPlanetDetails ({ commit }, payload) {
    const response = await planetService.getPlanetDetails(payload)
    commit('setPlanetDetails', response)
  },
  async changePagination ({ commit }, payload) {
    const response = await planetService.getPlanetsFromPage(payload.page)
    commit('setPlanets', response.results)
  }
}

const mutations = {
  setPlanets (state, planets) {
    state.allPlanets = []
    for (const planet of planets) {
      state.allPlanets.push(new Planet(planet))
    }
  },
  setPlanetDetails (state, planetData) {
    state.planetDetails = new Planet(planetData)
  },
  setPlanetsCount (state, count) {
    state.planetCount = count
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}