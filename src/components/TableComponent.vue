<template>
  <v-card flat>
    <v-data-table 
    v-model:sort-by="sortBy"
    v-memo="[data, isLoading, search, sortBy, page, pageCount]"
    :items="data"
    :fixed-header="true"
    :loading='isLoading' 
    :search="search" 
    :mobile="smAndDown"
    :headers='headers'
    density="compact"
    >
    <template v-slot:top>
      <v-text-field
        class='pa-2'
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
        item-key="name"
      ></v-text-field>
    </template>
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>
      <template v-slot:item.url="{ item }">
        <v-btn variant='outlined' @click='goToDetails(item.url)'>Check</v-btn>
      </template>
      <template v-slot:bottom>
        <div class="text-center pt-2">
          <v-pagination
            v-model="page"
            :length="pageCount"
          ></v-pagination>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import { useDisplay } from 'vuetify'

const { smAndDown } = useDisplay()
const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  isLoading: {
    type: Boolean,
    required: true
  },
  headers: {
    type: Array,
    required: true
  },
  planetsCount: {
    type: Number,
    required: false
  },
  sortBy: {
    type: Array,
    required: false,
    defaultValue: []
  }
})

const emit = defineEmits(['changePagination', 'goToDetails'])

const sortBy = ref(props.sortBy)
watch(
  () => props.sortBy,
  (newSort) => {
    sortBy.value = newSort;
  }
);

const search = ref('')

const page = ref(1)
const pageCount = computed(() => {
  return Math.ceil(props.planetsCount / 10)
})
watch(
  () => page.value,
  () => {
    emit('changePagination', page.value)
  }
)

const goToDetails = (id) => {
  emit('goToDetails', id)
}
</script>
