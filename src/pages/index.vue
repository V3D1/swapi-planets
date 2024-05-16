<template>
  <v-container class="fill-height" :class="smAndDown ? 'pa-0' : 'pa-2'">
    <v-responsive
      class="align-centerfill-height mx-auto mb-3"
      max-width="1200"
      width='365'
    >
      <v-img
        class="mb-4 mt-2 levitating"
        height="175"
        src="@/assets/images/tatooine.png"
      />

      <div class="text-center">
        <h1 class="text-h3 font-weight-bold">Star Wars Planets API</h1>
      </div>
      <div class="py-4" />
      <TableComponent :data='planetsData' :isLoading='isLoading' :headers='headers' :planetsCount='planetsCount' @changePagination='changePagination' @goToDetails='goToDetails' :sortBy='sortBy' />
      <div class="mt-4">
        <p class='text-center mb-3'>Click button below to choose sort order</p>
        <div class='d-flex justify-center flex-wrap ga-3'>
          <v-btn @click="changeSort('rotation_period')">Rotation period</v-btn>
          <v-btn @click="changeSort('climate')">Climate</v-btn>
          <v-btn @click="changeSort('created')">Created</v-btn>
          <v-btn @click="changeSort">Reset</v-btn>
        </div>
      </div>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router/auto'
import { onMounted, computed, ref } from "vue"
import { useStore } from 'vuex'
import { useDisplay } from 'vuetify'

const { smAndDown } = useDisplay()

const router = useRouter()
const store = useStore()
const isLoading = ref(false)
const planetsData = computed(() => store.getters['planetStore/getPlanets'])
const planetsCount = computed(() => store.getters['planetStore/getPlanetsCount'])
const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Population', key: 'population' },
  { title: 'Rotation period', key: 'rotation_period' },
  { title: 'Climate', key: 'climate' },
  { title: 'Gravity', key: 'gravity' },
  { title: 'Created', key: 'created' },
  { title: 'Options', key: 'url' },
]
const sortBy = ref([{ key: 'population', order: 'asc' }])
const changeSort = (sortValue) => sortValue ? sortBy.value = [{ key: sortValue, order: 'asc' }] : sortBy.value = []

onMounted(async () => {
  isLoading.value = true
  await store.dispatch('planetStore/fetchAllPlanets')
  isLoading.value = false
})

const changePagination = async (page) => {
  isLoading.value = true
  await store.dispatch('planetStore/changePagination', { page })
  isLoading.value = false
}
const goToDetails = async (id) => {
  await router.push({ name: '/planets/[id]', params: { id: id } })
}
</script>
<style scoped>
@keyframes levitate {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.levitating {
  animation: levitate 4s ease-in-out infinite;
  will-change: transform;
}
</style>
