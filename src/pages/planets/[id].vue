<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="1000"
    >
      <v-img
        class="mb-4 levitating"
        height="175"
        src="@/assets/images/tatooine.png"
      />
      <v-skeleton-loader
        v-if='isLoading'
        class="mx-auto border"
        max-width="300"
        type="list-item-three-line"
      ></v-skeleton-loader>
      <div class="text-center" v-else>
        <h2>Planet name: {{ planetDetails.name }}</h2>
        <h2>Population: {{ planetDetails.population }}</h2>
        <v-btn class='mt-5' @click='goBack'>Back</v-btn>
      </div>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router/auto'

const route = useRoute()
const router = useRouter()

const store = useStore()
const planetDetails = computed(() => store.getters['planetStore/getPlanetDetails'])
const isLoading = ref(false)
onMounted(async () => {
  isLoading.value = true
  await store.dispatch('planetStore/fetchPlanetDetails', route.params.id)
  isLoading.value = false
})

const goBack = () => {  
  try {
    router.back()
  } catch (error) {
    console.error("Navigation error:", error)
}}
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
